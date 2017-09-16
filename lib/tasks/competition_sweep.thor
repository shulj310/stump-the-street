class CompetitionSweep < Thor
  require File.expand_path("config/environment.rb")

  desc "mailer","sends test email"

  def mailer
    CompetitionMailer.end_of_day(User.last).deliver
  end


  desc "updater", "updates all pertinent data"

  def updater
    Portfolio.all.each {|p| p.touch}
    CompetitorPortfolio.all.each {|cp| cp.touch}
    Competition.active.each do |c|

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
    unless DateTime.now.saturday? || DateTime.now.sunday?
      Competition.ready_for_settlement.each do |comp|
        Competition.transaction do
          winnings = 0
          if comp.is_group?
            win = true # group comp. always has a winner
            # TODO: consider handling tie condition
            portfolio = comp.top_portfolio
            user = portfolio.user
            comp.portfolios.each do |port|
              unless port.id == portfolio.id
                port.won = false
                port.save!
              end
            end
          else
            win = (comp.diff > 0)
            user = comp.user
            portfolio = comp.portfolio
          end
          portfolio.won = win
          portfolio.save!
          
          if win
            winnings = comp.current_value
            user.wallet += winnings
            user.wallet += comp.wager_amount
            user.save
          end
          comp.return = portfolio.return
          comp.winnings = winnings
          comp.completed!
          comp.save!
        end
        mail_results comp
      end
    end
  end

  private
    def mail_results(comp)
      comp.portfolios.each do |portfolio|
        CompetitionMailer.competition_end(comp,portfolio.user).deliver
      end
    end
end
