class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    port = Portfolio.find(params[:portfolio_id])

    if port.competition.user == current_user
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
    ticker,shares,side = trade_params

    portfolio = Portfolio.find(params[:portfolio_id])

    stock = Stock.find_by(ticker:ticker)

    if Market.new.open?
      trade_attributes = {
        portfolio_id: params[:portfolio_id],
        stock_id: stock.id,
        shares: shares.floor,
        side: side,
      }

      if portfolio.competition.user == current_user
        unless @price_limit
          trade_attributes[:transaction_price] = stock.get_quote(side)

          trade = Trade.create(trade_attributes)
        else
          trade_attributes[:price] = @price_limit

          trade = LimitOrder.create(trade_attributes)
        end
        
        if trade.valid?
          position = Position.find_by(
            stock_id:stock.id,portfolio_id:params[:portfolio_id])

          render json: position, include: ["stock"]
        else
          render json: {auth:"no-cash", message:trade.errors}
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

  def trade_params
    data = JSON.parse(request.body.read)
    @price_limit = data['price_limit']
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
