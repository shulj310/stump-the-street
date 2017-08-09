class CompetitionMailer < ApplicationMailer

  def end_of_day(user)
    @user = user
    @competitions = user.competitions
    @value = Competition.where(user_id:@user.id).pluck(:wager_amount).inject(0) {|sum,x| sum + x}
    @portfolios = @competitions.map {|c| c.portfolio}

    mail(
      to:user.email,
      subject: "Stump's Daily Dashboard"
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
