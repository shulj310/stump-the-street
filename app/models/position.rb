class Position < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock


  #
  # def cost
  #   trades = Portfolio.find(self.portfolio_id).trades
  #
  # end

end
