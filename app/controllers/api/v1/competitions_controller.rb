require_relative "./utils/odds"

class Api::V1::CompetitionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    current_user.competitions.each do |comp|
      comp.touch
    end

    competitions = Competition.select(:'portfolios.id',:'portfolios.name',:deadline,
      :'portfolios.return',:current_value,:diff,'competitor_portfolios.return AS comp_return'
        ).joins(:portfolios,:competitor_portfolio).where(
          "win IS NULL AND
          portfolios.competition_id = competitions.id AND
          competitor_portfolios.competition_id = competitions.id AND
          competitions.user_id = #{current_user.id} AND
          (portfolios.user_id IS NULL OR portfolios.user_id = #{current_user.id})").order(
            :deadline)

    render json: competitions
  end

  def create

    if current_user

    data = JSON.parse(request.body.read)

      if current_user.wallet >= data["wager_amount"].to_i

        date = DateTime.now + data["length"].to_i

        new_date = date_change(date)

        odds = Odds.new(data["length"],data["competitor"])

        odds_calculated = odds.calc_odds

        new_competition = Competition.create!(
          length: data["length"],
          deadline: new_date,
          wager_amount: data["wager_amount"].to_i,
          odds_calculated: odds_calculated,
          current_value: data["wager_amount"].to_f*odds_calculated,
          competitor_id: data["competitor"].to_i,
          user_id: current_user.id,
          status: :active, # mark non-group competitions as active immediately
          starts_at: Time.now,
        )

        Portfolio.create!(
          name: data["strategy"],
          value: 1000000,
          cash: 1000000,
          return: 0,
          competition: new_competition,
          user: current_user,
        )


        CompetitorPortfolio.create!(
          competition_id: new_competition.id,
          value: 1000000,
          cost: 1000000,
          return: 0
        )


        render json: new_competition, include: ["portfolio"]
      else
        render json: {auth:"not enough cash"}
      end

    else
      render json: {auth:false}
    end
  end

  def date_change(date)
    if date.wday == 6
      date -= 1
    elsif date.wday == 0
      date += 1
    end
    return date.change({hour:16,min:0,sec:0})
  end
end
