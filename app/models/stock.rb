class Stock < ApplicationRecord
  has_many :trades
  has_many :positions

  after_find do |stock|
    stock.price = StockQuote::Stock.quote(
      self.ticker, nil, nil, ['last_trade_price_only']).last_trade_price_only
    if stock.price
      stock.save
    end
  end

end
