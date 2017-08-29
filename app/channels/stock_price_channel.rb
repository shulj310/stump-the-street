class StockPriceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "portfolio_#{params[:portfolio_id]}"

    # options ={
    #   username = ENV["INTRINIO_USERNAME"]
    #   password = ENV["INTRINIO_PASSWORD"]
    # }
    # client = Intrinio::Realtime::Client.new(options)
    # client.connect()
    # binding.pry
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    tickers = data["message"]

    puts "Tickers are #{tickers}"

    options = {
      username: ENV["INTRINIO_USERNAME"],
      password: ENV["INTRINIO_PASSWORD"],
      channels: tickers
    }
    client = Intrinio::Realtime::Client.new(options)
    client.connect()
    client.on_quote do |quote|
      puts quote
    end

  end
end
