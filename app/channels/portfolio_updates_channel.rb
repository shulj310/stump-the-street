class PortfolioUpdatesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "portfolio_#{params[:portfolio_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
