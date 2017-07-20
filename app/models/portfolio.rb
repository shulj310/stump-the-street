class Portfolio < ApplicationRecord
  belongs_to :competition
  has_many :trades
  has_many :positions
  has_many :stocks,
    through: :positions
  accepts_nested_attributes_for :stocks
end
