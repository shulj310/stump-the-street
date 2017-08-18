class Stock < ApplicationRecord
  has_many :trades
  has_many :positions
  has_many :trade_queues

  after_touch do |stock|
    stock.get_price
  end


  def get_price

    api_key = ENV["BAR_CHART_API"]

    url = "http://marketdata.websol.barchart.com/getQuote.json?key=#{api_key}&symbols=#{self.ticker}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      self.price = data["results"][0]["lastPrice"].to_f
      self.save
    end
  end

  def get_price_and_name

    api_key = ENV["BAR_CHART_API"]

    url = "http://marketdata.websol.barchart.com/getQuote.json?key=#{api_key}&symbols=#{self.ticker}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      self.price = data["results"][0]["lastPrice"].to_f
      self.name = data["results"][0]["name"]
      self.save
    end
  end

  def get_daily_return
    api_key = ENV["BAR_CHART_API"]

    url = "http://marketdata.websol.barchart.com/getQuote.json?key=#{api_key}&symbols=#{self.ticker}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      return data["results"][0]["percentChange"].to_f
    else
      return 0
    end
  end
end
