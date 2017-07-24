class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    stocks = Portfolio.select(:id,"stocks.id AS stock_id",
      :'positions.shares',:'positions.cost',:'stocks.ticker',:'stocks.price').joins(
          :positions,:stocks).where("stocks.id = positions.stock_id")

    render json: stocks
  end

  def create
    data = JSON.parse(request.body.read)
    ticker = data["ticker"]
    shares = data["share_amount"].to_i
    stock = Stock.find_by(ticker:ticker)

    if stock.nil?
      stock = new_stock(ticker)
    end

    Trade.create(
      portfolio_id: params[:portfolio_id],
      stock_id: stock.id,
      transaction_price: stock.price,
      shares: shares
    )

    position = Position.find_by(stock_id:stock.id)

    if position
      render json: position, include: ["stock"], notice: "You traded #{ticker} at #{stock.price}"
    else

      new_stock = {
        shares:shares,
        price: stock.price,
        value: stock.price*shares,
        cost:stock.price*shares,
        id:stock.id
      }

      render json: new_stock, notice: "You traded #{ticker} at #{stock.price}"
    end
  end


  def new_stock(ticker)
    new_stock = StockQuote::Stock.quote(ticker)

    stock = Stock.create(
          ticker:ticker,
          name:new_stock.name,
          price:new_stock.last_trade_price_only
        )
    return stock
  end

end
