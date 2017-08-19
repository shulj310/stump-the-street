class Api::V1::ResearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    username = "0a340fb18444a2517db5a5a869ebf04e"
    password = "4f6b78e96d048f48a6898fad777e9469"

    request_url = "https://api.intrinio.com/companies?identifier=AAPL"
    restclient = RestClient::Resource.new(request_url,username,password)

    response = restclient.get

    company = JSON.parse(response)
    render json: company

  end

  def more_fund_data

    ticker = params[:stock_id].upcase

    username = "0a340fb18444a2517db5a5a869ebf04e"
    password = "4f6b78e96d048f48a6898fad777e9469"

    request_url = "https://api.intrinio.com/securities/search?conditions=open_price~gt~10.50,pricetoearnings~gt~10"
    # request_url = "https://api.intrinio.com/data_point?identifier=#{ticker}&item=pricetoearnings"
    # request_url = "https://api.intrinio.com/companies?ticker=#{ticker}"
    # request_url = "https://api.intrinio.com/companies?identifier=#{ticker}"

    restclient = RestClient::Resource.new(request_url,username,password)

    # response = HTTP.basic_auth(:user => username, :pass => password)
    #                .get(request_url)
    #                .body

    response = restclient.get

    company = JSON.parse(response)
    render json: company

  end
end
