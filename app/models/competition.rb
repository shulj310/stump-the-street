class Competition < ApplicationRecord
  belongs_to :user
  belongs_to :competitor, optional: true
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
    comp.portfolios.each{|p| p.touch}
    unless comp.is_group?
      comp.diff = comp.portfolio.return - comp.top_portfolio.return
      comp.save
    end
  end

  def diff_for(port)
    port.return - top_portfolio.return
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

  # attempt to start group competition that hasn't begun yet
  # designed to be run regularly (at the start of market day)
  def start!
    # attempt to start only group competitions that are not active
    return unless created? and is_group?
    if (starts_at and starts_at >= Time.now) or (max_users and portfolios.count >= max_users)
      # ready to start
      if portfolios.count < 2
        # hit deadline but not ready to start
        cancelled!
      else
        deadline = Time.now + length.days
        starts_at = Time.now # reset to actual start time
        active!
      end
    else
      # not ready to be started yet
      false
    end
  end
end
