class Api::V1::PortfoliosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    portfolios = Competition.where(user_id:current_user.id).map {|comp| comp.portfolio}
    render json: portfolios, include: ["positions"]
  end

  def show

    portfolio = Portfolio.find(params[:id])
    portfolio.competition.competitor_portfolio.touch

    if portfolio.competition.user == current_user
      portfolio.touch
      portfolio.competition.touch
      data = Competition.select(:competitor_id,:wager_amount,:'portfolios.id',:'portfolios.name',:deadline,
        :'portfolios.return',:diff,'competitor_portfolios.cost AS comp_cost','competitor_portfolios.value AS comp_price',:'portfolios.value',:'portfolios.cash'
          ).joins(:portfolio,:competitor_portfolio).where(
            "portfolios.competition_id = competitions.id AND competitor_portfolios.competition_id = competitions.id AND portfolios.id = #{params[:id]}")

      render json: data
    elsif current_user
      render json: {auth:false,message:"can only visit your portfolio"}
    else
      render json: {auth:false, message:"must be signed in to view portfolios"}
    end
  end

end
