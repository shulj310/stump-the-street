class NewStockList < Thor
  require File.expand_path("config/environment.rb")

  desc "new_stock","gather new stock list and updates database"

  def new_stock
    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]

    current_page = 1
    total_pages = 100

    while current_page <= total_pages

      request_url = "https://api.intrinio.com/securities/search?conditions=average_daily_volume~gte~500000,marketcap~gte~500000000,sector~gte~0,sic~gte~0,name~gte~0,close_price~gte~2&page_number=#{current_page}"
      restclient = RestClient::Resource.new(request_url,username,password)
      response = restclient.get

      stock_list = JSON.parse(response)

      puts stock_list["result_count"]

      stock_list["data"].each do |stock|

        ticker = stock["ticker"]

        current_stock = Stock.find_by(ticker:ticker)

        sic = stock["sic"]
        sector = stock["sector"]
        name = stock["name"]
        price = stock["close_price"]

        if current_stock.nil?
          Stock.create(
            ticker:ticker,
            name: name,
            price:price,
            sector:sector,
            sic:sic
          )
        else
          current_stock.sic = sic
          current_stock.sector = sector
          current_stock.price = price
          current_stock.save
        end

      end

      current_page = stock_list["current_page"] +=1

      total_pages = stock_list["total_pages"]
    end
  end
end
