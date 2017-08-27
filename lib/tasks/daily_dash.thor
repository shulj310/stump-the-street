class DailyDash < Thor
  require File.expand_path("config/environment.rb")
  require_relative('./dash/CompetitionPrep')

  desc "end_of_day","sends perf updates at the end of day"

  def end_of_day
    unless DateTime.now.saturday? || DateTime.now.sunday?
      User.all.each do |user|
        competitions = []
        user.competitions.each do |comp|

          date = DateTime.now - 1

          trades = comp.portfolio.trades.select {|trade| trade.created_at>date}.length

          prior_value = PortfolioHistory.find_by(portfolio_id:comp.portfolio.id).value

          PortfolioHistory.create(
            portfolio_id: comp.portfolio.id,
            value:comp.portfolio.value,
            trades_made:trades
          )
          competitions.push(CompetitionPrep.new(comp,prior_value))
        end
        if competitions.length > 0
          CompetitionMailer.end_of_day(user,competitions).deliver
        end
      end
    end
  end
end
