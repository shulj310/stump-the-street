class Trending < Thor
  require File.expand_path("config/environment.rb")

  desc "trending","pulls Stock Twits API for trending tickers"

  def trending

    TrendingTicker.delete_all

    request_url = "https://api.stocktwits.com/api/2/trending/symbols/equities.json"
    restclient = RestClient::Resource.new(request_url,ENV["stocktwits_username"],ENV["stocktwits_password"])
    response = restclient.get

    trending_stocks = JSON.parse(response)

    trending_stocks["symbols"].each do |stock|

      stock_object = Stock.find_by(ticker:stock["symbol"])

      unless stock_object.nil?

        TrendingTicker.create(
          stock_id: stock_object.id,
          ticker: stock["symbol"],
          news_url: "http://www.marketwatch.com/investing/stock/#{stock['symbol']}"
        )
      end
    end
  end
end
