class TradeQueueMailer < ApplicationMailer

  def trade(trades,user,trade_errors)
    @user = user
    @trades = trades
    @trade_errors = trade_errors

    if @trades.length > 0
      mail(
        to:user.email,
        subject: "Your Open Orders Have Been Executed"
      )

    else

      mail(
        to:user.email,
        subject: "Your Open Orders Were Not Executed"
      )

    end

  end

end
