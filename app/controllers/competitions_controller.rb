class CompetitionsController < ApplicationController
  def index
    @competitions = Competition.all
  end

  def new
    @competition = Competition.new
  end

  def create
    # @competition = Competition.create(competition_params)

  end

  private

  def competition_params
    local_params = params.require(:competition
              ).permit(:length,:wager_amount)
    local_params[:user_id] = session["warden.user.user.key"][0][0]
    #### as of now, only one competitor (the market!) #####
    local_params[:competitor_id] = 1
    local_params[:deadline] = DateTime.now + local_params[:length]
    return local_params
  end

end
