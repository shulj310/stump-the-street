class Competition < ApplicationRecord
  belongs_to :user
  belongs_to :competitor
  has_one :competitor_portfolio
  has_many :portfolios

  enum status: [ :created, :active, :completed, :cancelled ]

  scope :ready_for_settlement, -> { where('deadline < NOW()').where(status: :active) }

  after_create do |comp|
    user = comp.user

    user.wallet -= comp.wager_amount
    user.save
  end

  after_touch do |comp|
    comp.portfolio.touch
    unless comp.is_group?
      comp.diff = comp.portfolio.return - comp.competitor_portfolio.return
      comp.save
    end
  end

  # convenience getter for non-group competitions
  def portfolio
    raise 'Attempting to access single Portfolio for a group Competition. Use portfolios relation instead.' if is_group?
    portfolios.first
  end

  def is_group?
    competitor_id.nil?
  end

  def top_portfolio
    if is_group?
      portfolios.each{|port| port.touch}
      portfolios.order(:return).last
    else
      competitor_portfolio
    end
  end

  def winner
    winning_portfolio = portfolios.find_by(won:true)
    winning_portfolio.present ? winning_portfolio.user : nil
  end
end
