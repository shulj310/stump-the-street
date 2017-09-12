class LimitOrders
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(ticker, type, price)
    type = type.to_sym
    if type == :ask
      condition = "side AND #{price} <= limit_orders.price"
    elsif type == :bid
      condition = "NOT side AND #{price} >= limit_orders.price"
    else
      raise ArgumentError, "Unrecognised quote type #{type}"
    end

    orders = LimitOrder.
      includes(:stock).
      where(stocks: {ticker:ticker}).
      where("#{condition} AND deadline > NOW()")

    orders.each do |lo|
      lo.create_order
    end
  end
end
