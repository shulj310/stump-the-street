class TradeQueueFill < Thor
  require File.expand_path("config/environment.rb")

  desc "open_trade","buys stocks on the open"

  def open_trade
    unless DateTime.now.saturday? || DateTime.now.sunday?
      User.all.each do |user|

        trade_queue = []
        trade_errors = []

        user.competitions.each do |competition|

          TradeQueue.where(portfolio_id:competition.portfolio.id).order(:side).each do |trade|
            trade.portfolio.touch

            tx_price = trade.stock.get_quote(trade.side)

            if (trade.side && trade.portfolio.cash > tx_price * trade.shares
                ) || (!trade.side && trade.portfolio.positions.find_by(stock_id:trade.stock.id).shares >= trade.shares)
              Trade.create(
                portfolio_id:trade.portfolio.id,
                stock_id:trade.stock.id,
                transaction_price:tx_price,
                shares:trade.shares,
                side:trade.side
              )

              trade_queue.push(trade)
              trade.destroy
            else
              trade_errors.push(trade)
              trade.destroy
            end
          end
        end

        if trade_queue.length > 0 || trade_errors.length > 0
          TradeQueueMailer.trade(trade_queue,user,trade_errors).deliver
        end
      end
    end
  end
end
