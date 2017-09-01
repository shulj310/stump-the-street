class LimitOrder < ApplicationRecord
  belongs_to :portfolio

  def create_order(quote)
    stock = Stock.find_by(quote['ticker'])
    tx_px = stock.get_quote(quote['ticker'],self.side)


    Trade.create(
      ticker:quote["ticker"],
      side:self.side,
      transaction_price:tx_px,
      portfolio_id:self.portfolio_id,
      stock_id:stock.id
    )

    self.destroy
  end
end
