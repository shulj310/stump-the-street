class PriceFeed < Thor
  require File.expand_path("config/environment.rb")
  require 'thread/pool'
  require 'nil_monkey_patch'

  desc "price_feed","continiously gather stock prices and update database"

  SUBSCRIPTION_LIMIT = 50
  SWITCH_EVERY = 1.second
  # INDEX = 0
  # TOTAL_STOCK_GROUP_LENGTH = 0

  def price_feed

    index = 0
    total_stock_group_length = all_stocks[0].to_i
    sg = stock_groups(index)
    current_group = 0
    quotes = Hash.new # keeps latest quote values

    options = {
      username: ENV["INTRINIO_USERNAME"],
      password: ENV["INTRINIO_PASSWORD"],
      channels: sg.dup, # dup is required as Intrinio::Realtime clears array passed here!
    }

    pool = Thread.pool(50)
    EventMachine.run do
      puts 'hello'
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
            client.leave(last_stock(index).dup)
            puts ">LEAVE COMPLETED (#{last_stock(index)})"
            index += 1
            index = 0 if index > total_stock_group_length
            channels_to_join = next_stock(index)
            puts ">JOINING #{channels_to_join}"
            client.join(channels_to_join.dup)
            puts ">JOIN COMPLETED (#{stock_groups(index)})"
          end
        end
      end
    end
  end

  private
    def next_stock(i)
      stock_groups(i).first
    end

    def last_stock(i)
      stock_groups(i).last
    end

    def all_stocks
      stocks =  Stock.all.limit(100).map do |stock|
              stock['ticker']
            end
      return [stocks.length,stocks]
    end

    def stock_groups(i) # get active stocks and group them in batches < SUBSCRIPTION_LIMIT
      # stocks = Stock.connection.select_all('SELECT
      #   DISTINCT ticker
      # FROM stocks
      # INNER JOIN positions ON (positions.stock_id = stocks.id)
      # WHERE portfolio_id IS NOT NULL')
      # stocks = Stock.all.limit(100).map do |stock|
      #   stock['ticker']
      # end
      # total_stock_group_length = stocks.length
      total_stock_group_length,stocks = all_stocks[0],all_stocks[1]
      if i < total_stock_group_length - SUBSCRIPTION_LIMIT
        stocks.slice(i,SUBSCRIPTION_LIMIT)
      else
        stocks.slice(i,SUBSCRIPTION_LIMIT).concat(stocks.slice(0,i-SUBSCRIPTION_LIMIT))
      end
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
