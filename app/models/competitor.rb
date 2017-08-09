class Competitor < ApplicationRecord
  has_many :competitions
  belongs_to :competition_history
end
