class Competition < ApplicationRecord
  belongs_to :user
  belongs_to :competitor
  has_many :competitor_portfolios
  has_many :portfolios
end
