class StatusMailer < ApplicationMailer

  def update(total_users,total_competitions,total_exposure,current_exposure)

    @total_users,@total_competitions,@total_exposure, @current_exposure = total_users,total_competitions,total_exposure,current_exposure

    mail(
    to:"shulman.jared@gmail.com",
    subject: "Status Update"

    )

  end
end
