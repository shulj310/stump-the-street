class Trade < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock
  
  validates :shares, presence: true, numericality:

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
    else

      Position.create(
        portfolio_id:trade.portfolio_id,
        shares:trade.shares,
        stock_id:trade.stock_id,
        value: trade.transaction_price*trade.shares,
        cost: (trade.transaction_price)
      )
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
    portfolio.calc_value
    portfolio.save
  end
end
