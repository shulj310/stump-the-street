module TradeValidations
  extend ActiveSupport::Concern

  included do
    validate :sufficient_funds
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