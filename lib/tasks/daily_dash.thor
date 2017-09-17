class DailyDash < Thor
  require File.expand_path("config/environment.rb")
  require_relative('./dash/CompetitionPrep')

  desc "end_of_day","sends perf updates at the end of day"

  def end_of_day
    unless DateTime.now.saturday? || DateTime.now.sunday?
      competitions = {}
      Competition.active do |comp|
        date = DateTime.now - 1
        comp.portfolios.each do |portfolio|
          trades = portfolio.trades.select {|trade| trade.created_at>date}.length

          prior_value = PortfolioHistory.where(portfolio:portfolio).last.value

          PortfolioHistory.create(
            portfolio_id: portfolio.id,
            value:portfolio.value,
            trades_made:trades
          )

          portfolios[portfolio.user] = [] unless portfolios[portfolio.user]
          portfolios[portfolio.user].push(CompetitionPrep.new(portfolio,prior_value))
        end
      end
      portfolios.each do |user,portfolios|
        CompetitionMailer.end_of_day(user,portfolios).deliver
      end
    end
  end
end
