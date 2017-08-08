class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    port = Portfolio.find(params[:portfolio_id])

    if port.competition.user == current_user

      port.positions.each do |position|
        if position.shares > 0
          position.stock.touch
        end
      end

      stocks = Portfolio.select(:id,"stocks.id AS stock_id",
        :'positions.shares',:'positions.cost',:'stocks.ticker',
          :'stocks.price',"stocks.price * positions.shares AS value"
            ).joins(:positions,:stocks).where(
            "stocks.id = positions.stock_id AND positions.shares > 0 AND portfolios.id = #{params[:portfolio_id]}").order("value DESC")

      render json: stocks
    else
      render json: {auth:false}
    end
  end

  def create

    port = Portfolio.find(params[:portfolio_id])


    if port.competition.user == current_user

      ticker,shares,side = trade_params

      stock = Stock.find_by(ticker:ticker)

      if stock.nil?
        stock = new_stock(ticker)
      end

      stock.touch

      Trade.create(
        portfolio_id: params[:portfolio_id],
        stock_id: stock.id,
        transaction_price: stock.price,
        shares: shares.floor,
        side: side
      )

      position = Position.find_by(
        stock_id:stock.id,portfolio_id:params[:portfolio_id])

      Portfolio.find(params[:portfolio_id])

      render json: position, include: ["stock"]
    else
      render json: {auth:false}
    end
  end

  def show
    url = "http://marketdata.websol.barchart.com/getQuote.json?key=b153d00b85faee7d352be6b91df7ec46&symbols=#{params[:id]}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      render json: data
    else
      render json: {data:nil}
    end
  end

  def fund_data

    data = StockQuote::Stock.quote(params[:stock_id].downcase)

    if data.response_code == 200
      render json: data
    else
      render json: {data:nil}
    end
  end

  def hist_price
    start = (DateTime.now-365).strftime("%Y%m%d")
    puts start
    url = "http://marketdata.websol.barchart.com/getHistory.json?key=b153d00b85faee7d352be6b91df7ec46&symbol=#{params[:stock_id]}&type=daily&startDate=#{start}"

    response = RestClient.get(url)

    data = JSON.parse(response)

    if data["status"]["code"] == 200
      render json: data
    else
      render json: {data:nil}
    end
  end


  def trade_params
    data = JSON.parse(request.body.read)
    return [data["ticker"].upcase , data["share_amount"].to_i, data["side"]]
  end

  def new_stock(ticker)

    stock = Stock.new

    stock.ticker = ticker
    stock.get_price_and_name

    return stock
  end

end
