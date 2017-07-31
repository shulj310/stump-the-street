class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    
    ######## current_user.competitions.find(Portfolio.find(params[:portfolio_id]))

    Portfolio.find(params[:portfolio_id]).positions.each do |position|
      position.stock.touch
    end

    stocks = Portfolio.select(:id,"stocks.id AS stock_id",
      :'positions.shares',:'positions.cost',:'stocks.ticker',
        :'stocks.price',"stocks.price * positions.shares AS value"
          ).joins(:positions,:stocks).where(
          "stocks.id = positions.stock_id","#{params[:portfolio_id]} AND
              positions.shares > 0").order("value DESC")

    render json: stocks
  end

  def create

    ticker,shares,side = trade_params

    stock = Stock.find_by(ticker:ticker)

    if stock.nil?
      stock = new_stock(ticker)
    end

    stock.touch

    Trade.create(
      portfolio_id: params[:portfolio_id],
      stock_id: stock.id,
      transaction_price: stock.price,
      shares: shares,
      side: side
    )

    position = Position.find_by(
      stock_id:stock.id,portfolio_id:params[:portfolio_id])

    render json: position, include: ["stock"]
  end


  def trade_params
    data = JSON.parse(request.body.read)
    return [data["ticker"].upcase , data["share_amount"].to_i, data["side"]]
  end

  def new_stock(ticker)

    stock = Stock.new

    stock.ticker = ticker
    stock.get_price_and_name

    return stock
  end

end
