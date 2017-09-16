class DailyDash < Thor
  require File.expand_path("config/environment.rb")
  require_relative('./dash/CompetitionPrep')

  desc "end_of_day","sends perf updates at the end of day"

  def end_of_day
    unless DateTime.now.saturday? || DateTime.now.sunday?
      competitions = {}
      Competition.active do |comp|
        date = DateTime.now - 1

        trades = comp.portfolio.trades.select {|trade| trade.created_at>date}.length

        prior_value = PortfolioHistory.find_by(portfolio_id:comp.portfolio.id).value

        PortfolioHistory.create(
          portfolio_id: comp.portfolio.id,
          value:comp.portfolio.value,
          trades_made:trades
        )

        competitions[user] = [] unless competitions[user]
        competitions[user].push(CompetitionPrep.new(comp,prior_value))
      end
      competitions.each do |user,competitions|
        CompetitionMailer.end_of_day(user,competitions).deliver
      end
    end
  end
end
