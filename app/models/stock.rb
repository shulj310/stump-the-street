class Stock < ApplicationRecord
  has_many :trades
  has_many :positions

  after_touch do |stock|

    puts "You have touched #{stock.ticker}"

    stock.get_price
  end


  def get_price
    url = "http://marketdata.websol.barchart.com/getQuote.json?key=b153d00b85faee7d352be6b91df7ec46&symbols=#{self.ticker}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      self.price = data["results"][0]["lastPrice"].to_f
      self.save
    end
  end

  def get_price_and_name
    url = "http://marketdata.websol.barchart.com/getQuote.json?key=b153d00b85faee7d352be6b91df7ec46&symbols=#{self.ticker}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      self.price = data["results"][0]["lastPrice"].to_f
      self.name = data["results"][0]["name"]
      self.save
    end
  end

end
