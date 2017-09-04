class Portfolio < ApplicationRecord
  belongs_to :competition
  has_many :trades
  has_many :positions
  has_many :stocks,
    through: :positions
  accepts_nested_attributes_for :stocks
  has_many :trade_queues
  has_many :portfolio_histories
  has_many :limit_orders

  after_create do |port|

    PortfolioHistory.create(
      portfolio_id:port.id,
      value:1000000,
      trades_made:0
    )
  end

  after_touch do |port|
    port.positions.each {|pos| pos.touch} ## TODO need a work to remove this method!
    port.value = port.positions.pluck(:value).inject(0) {|sum,x| sum + x} + port.cash
    port.return = port.value/1000000-1
    port.save
  end

end
