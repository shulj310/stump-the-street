class Trade < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock

  after_create do |trade|
    p =Position.find_by(portfolio_id:trade.portfolio_id,stock_id:trade.stock_id)
    if p
      if trade.shares>0
        p.cost = update_cost(p,trade)
      end
      p.shares += trade.shares
      p.save
      ## This is where we add the logic to get value/cost of each Position!
      puts "You traded #{p.stock.ticker}"
    else
      Position.create(
        portfolio_id:trade.portfolio_id,
        shares:trade.shares,
        stock_id:trade.stock_id,
        value: trade.transaction_price*trade.shares,
        cost: (trade.transaction_price)
      )
      puts "You opened a position on #{trade.stock.ticker}"
    end
  end

  private

  def update_cost(position,trade)

    return ((position.cost*position.shares) +
            (trade.transaction_price*trade.shares)
              )/( position.shares + trade.shares)
  end

end
