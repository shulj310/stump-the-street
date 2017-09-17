class Api::V1::PortfoliosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    portfolios = Competition.where(user_id:current_user.id, win: nil).map {|comp| comp.portfolio}
    render json: portfolios, include: ["positions"]
  end

  def show

    portfolio = Portfolio.find(params[:id])
    portfolio.competition.competitor_portfolio.touch

    if portfolio.user_id == current_user.id
      portfolio.touch
      portfolio.competition.touch
      data = Competition.select(:competitor_id,:wager_amount,:'portfolios.id',:'portfolios.name',:deadline,
        :'portfolios.return',:diff,'competitor_portfolios.cost AS comp_cost','competitor_portfolios.value AS comp_price',:'portfolios.value',:'portfolios.cash'
          ).joins(:portfolios,:competitor_portfolio).where(
            "won IS NULL AND
            portfolios.competition_id = competitions.id AND
            competitor_portfolios.competition_id = competitions.id AND
            portfolios.id = #{params[:id]}")

      render json: data
    elsif current_user
      render json: {auth:false,message:"can only visit your portfolio"}
    else
      render json: {auth:false, message:"must be signed in to view portfolios"}
    end
  end

  def create
    competition = Competition.find(params[:competition_id])
    unless competition.created?
      raise "Competition #{competition.id} has already been #{competition.status}"
    end
    if competition.portfolios.where(user: current_user).count > 0
      raise "Current user already has portfolio in the competition"
    end
    portfolio = Portfolio.create!(
      name: params["strategy"],
      value: 1000000,
      cash: 1000000,
      return: 0,
      competition: competition,
      user: current_user,
    )
    # attempt to start competition if max_users reached
    competition.start!
    render json: portfolio
  end
end
