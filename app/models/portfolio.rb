class Portfolio < ApplicationRecord
  belongs_to :competition
  has_many :trades
  has_many :positions
  has_many :stocks,
    through: :positions
  accepts_nested_attributes_for :stocks

  def calc_value
    self.positions.each {|pos| pos.touch}
    self.value = self.positions.pluck(:value).inject(0) {|sum,x| sum + x} + self.cash
    self.save
  end
end
