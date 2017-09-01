class PriceFeed < Thor
  require File.expand_path("config/environment.rb")
  require 'thread/pool'
  require 'nil_monkey_patch'

  desc "price_feed","continiously gather stock prices and update database"

  SUBSCRIPTION_LIMIT = 50
  SWITCH_EVERY = 1.second

  def price_feed

    index = 0
    @sg = stock_groups(index)
    current_group = 0
    quotes = Hash.new # keeps latest quote values

    options = {
      username: ENV["INTRINIO_USERNAME"],
      password: ENV["INTRINIO_PASSWORD"],
      channels: @sg.dup, # dup is required as Intrinio::Realtime clears array passed here!
    }

    pool = Thread.pool(50)
    EventMachine.run do
      client = Intrinio::Realtime::Client.new(options)
      client.on_quote do |quote|
        # Process quote in next available thread
        pool.process do
          if quote['type'] == 'last'
            puts quote
            # update pre-database cache
            quotes[quote['ticker']] = quote['price']
            # broadcast to subscribers
            ActionCable.server.broadcast(
              "ticker_#{quote['ticker']}",
              quote,
            )
            # this is a good place to check for stop limits and if any match process them
            # (probably in another thread or Sidekiq process)
          end
        end
      end
      client.connect


      EventMachine.add_periodic_timer(SWITCH_EVERY) do
        pool.process do
          puts ">FLUSH STARTED"
          flush_quotes(quotes)
          puts ">FLUSH_COMPLETED"
          if @total_stock_group_length > SUBSCRIPTION_LIMIT # rotate groups if there are more than SUBSCRIPTION_LIMIT active stocks
            client.leave(last_stock(index).dup)
            puts ">LEAVE COMPLETED (#{last_stock(index)})"
            index += 1
            index = 0 if index > @total_stock_group_length
            @sg = stock_groups(index)
            channels_to_join = next_stock(index)
            puts ">JOINING #{channels_to_join}"
            client.join(channels_to_join.dup)
            puts ">JOIN COMPLETED (#{stock_groups(index)})"
          else # refresh sg that are no being rotated normally
            @sg = stock_groups(index)
          end
        end
      end
    end
  end

  private
    def next_stock(i)
      @sg.first
    end

    def last_stock(i)
      @sg.last
    end

    def all_stocks
      Stock.all.limit(100).map do |stock|
        stock['ticker']
      end
    end

    def active_stocks
      Stock.connection.select_all('SELECT
        DISTINCT ticker AS ticker
      FROM stocks
      INNER JOIN positions ON (positions.stock_id = stocks.id)
      INNER JOIN portfolios ON (positions.portfolio_id = portfolios.id)
      WHERE competition_id IS NOT NULL AND positions.value > 0
      ORDER BY ticker').map do |stock|
        stock['ticker']
      end
    end

    def stock_groups(i) # get active stocks and group them in batches < SUBSCRIPTION_LIMIT
      stocks = active_stocks #all_stocks
      @total_stock_group_length = stocks.length
      #puts "i = #{i}"
      #puts "total len = #{@total_stock_group_length}"
      #puts "limit = #{SUBSCRIPTION_LIMIT}"
      if @total_stock_group_length <= SUBSCRIPTION_LIMIT
        stocks
      elsif i < @total_stock_group_length - SUBSCRIPTION_LIMIT
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
