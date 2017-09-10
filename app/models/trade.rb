class Trade < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock

  validate :sufficient_funds

  after_create do |trade|

    position = Position.find_by(portfolio_id:trade.portfolio_id,stock_id:trade.stock_id)

    update_cash

    if position

      if trade.side
        position.cost = update_cost(position,trade)
        position.shares += trade.shares
      else
        position.shares -= trade.shares
      end
      position.save
    elsif trade.side
      Position.create(
        portfolio_id:trade.portfolio_id,
        shares:trade.shares,
        stock_id:trade.stock_id,
        value: trade.transaction_price*trade.shares,
        cost: (trade.transaction_price)
      )
    else
      raise 'Attempting to sell where there is no position'
    end
  end

  private

  def update_cost(position,trade)

    return ((position.cost*position.shares) +
            (trade.transaction_price*trade.shares)
              )/( position.shares + trade.shares)
  end

  def update_cash
    portfolio = Portfolio.find(self.portfolio_id)

    if self.side
      portfolio.cash -= self.transaction_price*self.shares
    else
      portfolio.cash += self.transaction_price*self.shares
    end
    portfolio.save
  end

  def sufficient_funds
    portfolio.touch
    if side
      if portfolio.cash < transaction_price * shares
        errors.add(:cost, 'is over portfolio balance')
      end
    else
      if portfolio.positions.find_by(stock_id:stock_id).shares < shares
        errors.add(:shares, 'number is more than available in portfolio')
      end
    end
  end
end
