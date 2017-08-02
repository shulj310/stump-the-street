class Competition < ApplicationRecord
  belongs_to :user
  belongs_to :competitor
  has_one :competitor_portfolio
  has_one :portfolio

  after_touch do |comp|

    comp.portfolio.touch
    comp.competitor_portfolio.touch
    comp.diff = comp.portfolio.return - comp.competitor_portfolio.return
    comp.save
  end

end
