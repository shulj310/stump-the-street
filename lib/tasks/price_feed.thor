class PriceFeed < Thor
  require File.expand_path("config/environment.rb")
  require 'thread/pool'
  require 'nil_monkey_patch'

  desc "price_feed","continiously gather stock prices and update database"

  SUBSCRIPTION_LIMIT = 50
  SWITCH_EVERY = 1.second

  def price_feed
    sg = stock_groups
    current_group = 0
    quotes = Hash.new # keeps latest quote values

    options = {
      username: ENV["INTRINIO_USERNAME"],
      password: ENV["INTRINIO_PASSWORD"],
      channels: sg[current_group].dup, # dup is required as Intrinio::Realtime clears array passed here!
    }

    pool = Thread.pool(50)
    EventMachine.run do
      client = Intrinio::Realtime::Client.new(options)
      client.on_quote do |quote|
        # Process quote in next available thread
        pool.process do
          if quote['type'] == 'last'
            puts quote
            quotes[quote['ticker']] = quote['price']
            # this is a good place to check for stop limits and if any match process them
            # (probably in another thread or Sidekiq process)
          end
        end
      end
      client.connect

      if sg.count > 1 # rotate groups if there are more than SUBSCRIPTION_LIMIT active stocks
        EventMachine.add_periodic_timer(SWITCH_EVERY) do
          pool.process do
            puts ">FLUSH STARTED"
            flush_quotes(quotes)
            puts ">FLUSH_COMPLETED"
            client.leave(sg[current_group].dup)
            puts ">LEAVE COMPLETED (#{current_group})"
            current_group += 1
            current_group = 0 if current_group == sg.count
            channels_to_join = sg[current_group]
            puts ">JOINING #{channels_to_join}"
            client.join(channels_to_join.dup)
            puts ">JOIN COMPLETED (#{current_group})"
          end
        end
      end
    end
  end

  private
    def stock_groups # get active stocks and group them in batches < SUBSCRIPTION_LIMIT
      stocks = Stock.connection.select_all('SELECT
        DISTINCT ticker
      FROM stocks
      INNER JOIN positions ON (positions.stock_id = stocks.id)
      WHERE portfolio_id IS NOT NULL').map do |stock|
        stock['ticker']
      end
      stocks.each_slice(SUBSCRIPTION_LIMIT).to_a
    end

    def flush_quotes(quotes)
      stocks = Stock.where(ticker: quotes.keys).index_by(&:ticker)
      quotes_by_ids = Hash.new
      quotes.each do |ticker,quote|
        quotes_by_ids[stocks[ticker].id] = {
          price: quote,
        }
      end
      quotes.clear

      Stock.transaction do
        Stock.update(quotes_by_ids.keys, quotes_by_ids.values)
      end
    end
end
