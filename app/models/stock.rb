class Stock < ApplicationRecord
  has_many :trades
  has_many :positions
end
