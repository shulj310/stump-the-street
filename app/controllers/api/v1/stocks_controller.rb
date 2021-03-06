class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    port = Portfolio.find(params[:portfolio_id])

    if port.competition.user == current_user

      port.positions.each do |position|
        if position.shares > 0
          position.stock.touch
        end
      end

      stocks = Portfolio.select(:id,"stocks.id AS stock_id",
        :'positions.shares',:'positions.cost',:'stocks.ticker',
          :'stocks.price',"stocks.price * positions.shares AS value"
            ).joins(:positions,:stocks).where(
            "stocks.id = positions.stock_id AND positions.shares > 0 AND portfolios.id = #{params[:portfolio_id]}").order("value DESC")

      render json: stocks
    else
      render json: {auth:false}
    end
  end

  def tickers
    render json: Stock.all.pluck(:ticker)
  end

  def create

    portfolio = Portfolio.find(params[:portfolio_id])

    ticker,shares,side = trade_params


    stock = Stock.find_by(ticker:ticker)

    stock.get_price

    tx_px = make_trade(ticker,side)

    if Rails.env.production?

      current_time = Time.now.utc
      beg_time = Time.new(2017,8,1,13,30,0).utc
      end_time = Time.new(2017,8,1,20,0,0).utc

    else

      current_time = Time.now.utc
      beg_time = Time.new(2017,8,1,0,0,0).utc
      end_time = Time.new(2017,8,1,24,0,0).utc

    end

    if (beg_time.utc.strftime("%H%M%S%N") <= current_time.utc.strftime("%H%M%S%N") && current_time.utc.strftime("%H%M%S%N") <= end_time.utc.strftime("%H%M%S%N") && !current_time.saturday? && !current_time.sunday?)

      if portfolio.competition.user == current_user

        if (stock.price * shares <= portfolio.cash) || !side

          Trade.create(
            portfolio_id: params[:portfolio_id],
            stock_id: stock.id,
            transaction_price: tx_px,
            shares: shares.floor,
            side: side
          )

          position = Position.find_by(
            stock_id:stock.id,portfolio_id:params[:portfolio_id])

          render json: position, include: ["stock"]
        else
          render json: {auth:"no-cash"}
        end
      else
        ## user is not authorized
        render json: {auth:false}
      end
    else
      after_hours(portfolio,stock,shares,side)
      render json: {auth:"after-hours"}
    end
  end

  def show

    api_key = ENV["BAR_CHART_API"]

    url = "http://marketdata.websol.barchart.com/getQuote.json?key=#{api_key}&symbols=#{params[:id]}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      render json: data
    else
      render json: {data:nil}
    end
  end

  def fund_data

    data = StockQuote::Stock.quote(params[:stock_id].downcase)

    if data.response_code == 200
      render json: data
    else
      render json: {data:nil}
    end
  end

  def hist_price
    start = (DateTime.now-365).strftime("%Y%m%d")

    api_key = ENV["BAR_CHART_API"]

    url = "http://marketdata.websol.barchart.com/getHistory.json?key=#{api_key}&symbol=#{params[:stock_id]}&type=daily&startDate=#{start}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      render json: data
    else
      render json: {data:nil}
    end
  end

  def make_trade(ticker,side)
    request_url = "https://api.intrinio.com/data_point?identifier=#{ticker}&item=last_price,bid_price,ask_price"
    restclient = RestClient::Resource.new(request_url,ENV["INTRINIO_USERNAME"],ENV["INTRINIO_PASSWORD"])
    response = restclient.get

    price = JSON.parse(response)
    
    if side
      return price["data"].select { |o| o["item"] == "ask_price" }[0]["value"]
    else
      return price["data"].select { |o| o["item"] == "bid_price" }[0]["value"]
    end
  end


  def trade_params
    data = JSON.parse(request.body.read)
    return [data["ticker"].upcase , data["share_amount"].to_i, data["side"]]
  end

  def id
    render json: Stock.find_by(ticker:params[:stock_id].upcase)
  end

  def new_stock(ticker)

    stock = Stock.new

    stock.ticker = ticker
    stock.get_price_and_name

    return stock
  end

  def after_hours(portfolio,stock,shares,side)
    TradeQueue.create(
      portfolio_id:portfolio.id,
      stock_id:stock.id,
      shares:shares,
      side:side
    )
  end

end
