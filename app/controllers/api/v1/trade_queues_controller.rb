class Api::V1::TradeQueuesController < ApplicationController
  skip_before_action :verify_authenticity_token


  def show
    
    render json: TradeQueue.find_by(portfolio_id:params[:id]), include: ["stock"]

  end

  def update

  end

  def destroy

  end

end
