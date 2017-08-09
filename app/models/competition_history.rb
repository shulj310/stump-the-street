class CompetitionHistory < ApplicationRecord
  belongs_to :user
  has_one :competitor

end
