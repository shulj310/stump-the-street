class Portfolio < ApplicationRecord
  belongs_to :competition
  has_many :trades
  has_many :positions
  has_many :stocks,
    through: :positions
  accepts_nested_attributes_for :stocks


  after_touch do |portfolio|

    portfolio.value = calc_value + self.cash

  end

  def calc_value
    self.positions.pluck(:value).inject(0) {|sum,x| sum + x}
  end
end
