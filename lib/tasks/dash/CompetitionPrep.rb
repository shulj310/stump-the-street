class CompetitionPrep
  attr_reader :best_stock,:worst_stock,:cash_drag,:biggest_weight,:total_trades_to_date, :competition

  def initialize(competition,prior_value)
    @competition = competition
    @prior_value = prior_value
  end

  def best_stock
    best_stock = {}
    best_return = -1
    @competition.portfolio.positions.each do |pos|
      unless pos.value == 0
        if pos.return > best_return
          best_return = pos.return
          best_stock = pos
        end
      end
    end
    return best_stock
  end

  def worst_stock
    worst_stock = {}
    worst_return = 100
    @competition.portfolio.positions.each do |pos|
      unless pos.value == 0
        if pos.return < worst_return
          worst_return = pos.return
          worst_stock = pos
        end
      end
    end
    return worst_stock
  end

  def cash_drag
    return @competition.portfolio.cash / @competition.portfolio.value
  end

  def biggest_weight
    biggest_weight = {}
    max_weight = 0
    @competition.portfolio.positions.each do |pos|
      if pos.value >= max_weight
        max_weight = pos.value
        biggest_weight = pos
      end
    end
    return biggest_weight
  end

  def total_trades_to_date
    @competition.portfolio.trades.length
  end

  def total_trades_today
    @competition.portfolio.portfolio_histories.last.trades_made
  end

  def day_return_pct
    @competition.portfolio.portfolio_histories.last.value / @prior_value -1
  end

  def day_return_cash
    @competition.portfolio.portfolio_histories.last.value - @prior_value
  end

  def comp_return
    Stock.find_by(ticker:"SPY").get_daily_return
  end

end
