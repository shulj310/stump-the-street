class GetPrices

  def initialize(ticker,date)
    if ticker[0] == "_"
      @ticker = ticker[1..-1]
      @get_market = false
    else
      @ticker = ticker
      @get_market = true
    end
    @date = (DateTime.now - date.to_i).strftime("%Y-%m-%d")
    @username = ENV["INTRINIO_USERNAME"]
    @password = ENV["INTRINIO_PASSWORD"]
    @prices = []
    @url = "https://api.intrinio.com/historical_data?identifier=#{@ticker}&item=close_price&start_date=#{@date}&sort_order=asc&page_size=2000"
    self.prices
  end

  def prices
    restclient = RestClient::Resource.new(@url,@username,@password)
    response = restclient.get
    @prices = JSON.parse(response)
  end

  def market_prices
    @url = "https://api.intrinio.com/historical_data?identifier=SPY&item=close_price&start_date=#{@date}&sort_order=asc&page_size=2000"
    restclient = RestClient::Resource.new(@url,@username,@password)
    response = restclient.get
    @market_hash = {}
    market = JSON.parse(response)
    market["data"].map { |data| @market_hash[data.values[0]] = data.values[1] }
  end

  def map_prices
    price_hash = {}
    @prices["data"].map { |data| price_hash[data.values[0]] = data.values[1] }
    if @get_market
      self.market_prices
      return [{@ticker=>price_hash},{:SPY=>@market_hash}]
    else
      return {@ticker=>price_hash}
    end
  end

  def relative_prices
    first_price = @prices["data"][0].values[1]
    price_hash = {}
    @prices["data"].map { |data| price_hash[data.values[0]] = data.values[1]/first_price }
    return {@ticker=>price_hash}
  end
end
