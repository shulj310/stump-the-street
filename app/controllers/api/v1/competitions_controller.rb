class Api::V1::CompetitionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    current_user.competitions.each do |comp|
      comp.touch
    end

    competitions = Competition.select(:'portfolios.id',:'portfolios.name',:deadline,
      :'portfolios.return',:diff,'competitor_portfolios.return AS comp_return'
        ).joins(:portfolio,:competitor_portfolio).where(
          "portfolios.competition_id = competitions.id AND competitor_portfolios.competition_id = competitions.id AND competitions.user_id = #{current_user.id}").order(
            :deadline)
    #
    # render json: current_user.competitions.order(:deadline), include: ["portfolio"]

    render json: competitions
  end

  def create

    if current_user

    data = JSON.parse(request.body.read)
    new_competition = Competition.create(
      length: data["length"],
      deadline: DateTime.now + data["length"].to_i,
      wager_amount: data["wager_amount"].to_i,
      odds_calculated: 1,
      current_value: data["wager_amount"].to_f*0.95,
      competitor_id: 1,
      user_id: current_user.id
    )

    Portfolio.create(
      name: data["strategy"],
      value: 1000000,
      cash: 1000000,
      return: 0,
      competition_id: new_competition.id
    )


    CompetitorPortfolio.create(
      competition_id: new_competition.id,
      value: 1000000,
      cost: 1000000,
      return: 0
    )


    render json: new_competition, include: ["portfolio"]

    else
      render json: {auth:false}
    end
  end

end
