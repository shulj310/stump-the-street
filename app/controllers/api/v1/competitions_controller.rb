class Api::V1::CompetitionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Competition.all
  end

  def create
    data = JSON.parse(request.body.read)
    new_competition = Competition.create(
      length: data["length"],
      deadline: DateTime.now + data["length"].to_i,
      wager_amount: data["wager_amount"].to_i,
      odds_calculated: 1,
      current_value: data["wager_amount"].to_f*0.95,
      competitor_id: 1,
      user_id: 1
    )

    render json: new_competition
  end

end
