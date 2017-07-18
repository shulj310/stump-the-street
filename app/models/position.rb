class Position < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock
end
