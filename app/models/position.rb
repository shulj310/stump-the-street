class Position < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock

  after_touch do |pos|
    self.value = self.stock.price * self.shares
    self.save
  end
end
