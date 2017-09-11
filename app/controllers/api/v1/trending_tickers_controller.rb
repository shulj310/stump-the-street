class Api::V1::TrendingTickersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: TrendingTicker.all.limit(5)
  end

end
