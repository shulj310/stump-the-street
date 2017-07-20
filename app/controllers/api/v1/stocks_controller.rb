class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    stocks = Portfolio.find(params[:portfolio_id]).positions
    render json: stocks, include: ["stock"]
  end
end
