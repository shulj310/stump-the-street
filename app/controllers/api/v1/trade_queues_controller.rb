class Api::V1::TradeQueuesController < ApplicationController
  skip_before_action :verify_authenticity_token


  def show
    
    render json: TradeQueue.where(portfolio_id:params[:id]), include: ["stock"]

  end

  def update

  end

  def destroy

    data = JSON.parse(request.body.read)

    TradeQueue.find(data["tradeId"]).destroy

    render json: TradeQueue.where(portfolio_id:params[:id]), include: ["stock"]

  end

end
