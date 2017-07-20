class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    stocks = Portfolio.find(params[:portfolio_id]).positions.order(shares: :desc)
    render json: stocks, include: ["stock"]
  end

  def create
    data = JSON.parse(request.body.read)
    ticker = data["ticker"]
    shares = data["share_amount"].to_i
    stock = Stock.find_by(ticker:ticker)
    Trade.create(
      portfolio_id: params[:portfolio_id],
      stock_id: stock.id,
      transaction_price: stock.price,
      shares: shares
    )
    position = Position.find_by(stock_id:stock.id)
    if position
      position.shares += shares
      position.save
      render json: position, include: ["stock"]
    else
      new_position = Position.create(
        stock_id: stock.id,
        shares: shares,
        portfolio_id: params[:portfolio_id]
      )
      render json: new_position, include: ["stock"]
    end
  end
end
