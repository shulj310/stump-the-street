class Lead < ApplicationRecord
  validates :email, presence: true
end
