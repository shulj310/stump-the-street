class StockPriceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ticker_#{params[:ticker]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
