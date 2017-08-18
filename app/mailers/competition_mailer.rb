class CompetitionMailer < ApplicationMailer

  def end_of_day(user,competitions)
    @user = user
    @competitions = competitions

    mail(
      to:@user.email,
      subject: "Daily Dash"
    )

  end

  def competition_end(competition,win)
    @competition = competition
    @user = @competition.user
    @win = win

    if @win
      subject = "Ding, ding, ding, we have a winner..."
    else
      subject = "Your competition has ended!"
    end

    mail(
      to: @user.email,
      subject: subject
    )
  end
end
