class Api::V1::CompetitionsController < ApplicationController
  skip_before_action :verify_authenticity_token


  def show
    binding.pry
    render json: Portfolio.where(id:params[:portfolio_id])
  end

end
