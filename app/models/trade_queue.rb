class TradeQueue < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock
end
