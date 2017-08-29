class StatusMailer < ApplicationMailer

  def update(total_users,total_competitions,total_exposure,last_day_users,latest_users,current_exposure,stock_exposure, sorted_exposure_hash)

    @total_users,@total_competitions,@total_exposure, @current_exposure = total_users,total_competitions,total_exposure,current_exposure
    @last_day_users = last_day_users
    @latest_users = latest_users
    @sorted_exposure_hash = sorted_exposure_hash
    @stock_exposure = stock_exposure

    mail(
    to:"shulman.jared@gmail.com",
    subject: "Status Update"

    )

  end
end
