class Position < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock

  after_touch do |pos|
    self.value = self.stock.price * self.shares
    self.save
  end

  def return
    return ((self.stock.price / self.cost) -1)
  end

  def dollar_return
    self.value - (self.cost*self.shares)
  end
end
