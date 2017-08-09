class CompetitionSweep < Thor
  require File.expand_path("config/environment.rb")

  desc "mailer","sends test email"

  def mailer
    CompetitionMailer.end_of_day(User.last).deliver
  end


  desc "updater", "updates all pertinent data"

  def updater
    Stock.all.each {|s| s.touch}
    Portfolio.all.each {|p| p.touch}
    CompetitorPortfolio.all.each {|cp| cp.touch}
    Competition.all.each do |c|

      ## here is where we decide if the competition is over or not!
      ## update competition history table (which we need to create!)

      unless c.competitor_portfolio.nil?
        ### get rid of these competitions eventually!
        c.touch
      end
    end
  end

  desc "win_loss", "updates each win/loss"

  def win_loss
    User.all.each do |user|
      competitions = user.competitions

      competitions.each do |comp|

        if comp.competitor_portfolio.nil?
          comp.destroy
        else
          win = (comp.diff > 0)
          winnings = 0
          if comp.deadline < Time.now
            if win
              winnings = comp.current_value
              user.wallet += winnings
              user.save
            end
            CompetitionHistory.create(
              user_id: user.id,
              win: win,
              wager_amount: comp.wager_amount,
              competitor_id: comp.competitor_id,
              return: comp.portfolio.return,
              competitor_return: comp.competitor_portfolio.return,
              winnings: winnings
            )
            comp.destroy
          end
        end
      end
    end
  end
end