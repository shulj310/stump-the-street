class Api::V1::PortfoliosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    portfolio = Portfolio.find(params[:id])
    render json: portfolio, include: ["competition"]
  end

end
