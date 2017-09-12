class LimitOrder < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock

  include TradeValidations
  before_validation :init

  def create_order
    trade_attributes = attributes.slice('ticker', 'side', 'portfolio_id', 'stock_id', 'shares')
    trade_attributes['transaction_price'] = price
    
    trade = Trade.create!(trade_attributes)
    self.destroy!

    ActionCable.server.broadcast(
      "portfolio_#{portfolio_id}",
      { trade: trade }.to_json, 
    )
  end

  # potential transaction price for validation
  def transaction_price
    price
  end

  private
    def init
      self.deadline ||= Market.new.closing_time
    end
end
