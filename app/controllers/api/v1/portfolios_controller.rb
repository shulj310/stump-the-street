class Api::V1::PortfoliosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show

    portfolio = Portfolio.find(params[:id])

    if portfolio.competition.user == current_user
      portfolio.touch
      render json: portfolio, include: ["competition"]
    elsif current_user
      render json: {auth:false,message:"can only visit your portfolio"}
    else
      render json: {auth:false, message:"must be signed in to view portfolios"}
    end
  end

end
