class StockPriceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "portfolio_#{params[:portfolio_id]}"

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    EventMachine.stop()
  end

  def receive(data)
    tickers = data["message"]

    tickers = tickers.split(",")

    puts tickers

    logger = Logger.new($shully)
    logger.level = Logger::INFO


    options = {
      username: ENV["INTRINIO_USERNAME"],
      password: ENV["INTRINIO_PASSWORD"],
      channels: tickers
    }

    EventMachine.run do

      client = Intrinio::Realtime::Client.new(options)
      client.on_quote do |quote|
        ActionCable.server.broadcast("portfolio_#{params[:portfolio_id]}",quote)
        sleep 1
      end
      client.connect()

      EventMachine.add_timer(1) do
        client.join(tickers)
      end

      # EventMachine.add_timer(10) do
      #   client.disconnect()
      #   EventMachine.stop()
      # end

    end
  end
end
