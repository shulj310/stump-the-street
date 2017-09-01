require 'redis'

class PriceGrab
  include Sidekiq::Worker
  sidekiq_options retry: false
  require File.expand_path("config/environment.rb")

  def perform(quote)
    lo = LimitOrder.find_by(ticker:quote['ticker'])
    if lo
      order_check(lo,quote)
    end
  end

  def order_check(lo,quote)
    if (lo.side && lo.price <= quote['price']) || (!lo.side && lo.price >= quote['price'])
      lo.create_order(quote)
  end

end
