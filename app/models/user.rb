class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
   #
   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :dob, presence: true
   validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
   validates :country, presence: true
   validates :email, presence: true
   validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  has_many :competitions
  has_many :portfolios,
    through: :competitions
  has_many :competition_histories
  has_many :search_histories

end
