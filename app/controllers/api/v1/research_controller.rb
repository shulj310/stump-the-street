require_relative "./utils/data_label"
require_relative "./utils/get_prices"

class Api::V1::ResearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]

    request_url = "https://api.intrinio.com/companies?identifier=AAPL"
    restclient = RestClient::Resource.new(request_url,username,password)
    response = restclient.get

    company = JSON.parse(response)
    render json: company
  end

  def update
    ticker = params[:id]
    data = JSON.parse(request.body.read)

    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]


    name_tags = data["tags"]
    tags = name_tags.map {|tag| search_by_name(tag)}
    tags = tags.join(',')

    request_url = "https://api.intrinio.com/data_point?identifier=#{ticker}&item=#{tags}"
    restclient = RestClient::Resource.new(request_url,username,password)
    response = restclient.get

    company = JSON.parse(response)
    output = DataLabel.new(ticker,company).output

    render json: output
  end

  def search
    ticker = params[:research_id].upcase

    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]

    request_url = "https://api.intrinio.com/data_point?identifier=#{ticker}&item=#{TAGS}"
    restclient = RestClient::Resource.new(request_url,username,password)
    response = restclient.get

    company = JSON.parse(response)
    output = DataLabel.new(ticker,company).output

    render json: output
  end

  def header
    ticker = params[:research_id].upcase
    tags = "name,marketcap,last_price,sic,sector"

    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]

    request_url = "https://api.intrinio.com/data_point?identifier=#{ticker}&item=#{tags}"
    restclient = RestClient::Resource.new(request_url,username,password)
    response = restclient.get

    company = JSON.parse(response)
    output = DataLabel.new(ticker,company).header

    render json: output
  end

  def historical_data
    ticker,date = params[:research_id],params[:date_id]

    if ticker.starts_with?("rel-")
      pricing_data = ticker[4..-1].split("&").map do |tick|
        tick = "_#{tick}"
        GetPrices.new(tick,date.relative_prices)
      end
      render json: pricing_data
    elsif ticker.include?("&") && !ticker.include("rel-")
      pricing_data = ticker.split("&").map do |tick|
        tick = "_#{tick}"
        GetPrices.new(tick,date).map_prices
      end
      render json: pricing_data
    else
      pricing_data = GetPrices.new(ticker,date).map_prices
      render json: pricing_data
    end
  end

  def industry_comp
    ticker = params[:research_id]
    data = JSON.parse(request.body.read)
    sic = Stock.find_by(ticker:ticker).sic

    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]

    name_tags = data["tags"]
    tags = name_tags.map {|tag| search_by_name(tag)}
    tags = tags.join(',')

    request_url = "https://api.intrinio.com/data_point?identifier=$SIC.#{sic}&item=#{tags}"
    restclient = RestClient::Resource.new(request_url,username,password)
    response = restclient.get

    industry = JSON.parse(response)
    output = DataLabel.new(sic,industry).output

    render json: output
  end

  private

  def search_by_name(tag)
    name_to_tag = JSON.parse(File.read('./app/controllers/api/v1/utils/initioNames_to_tag.json'))
    returned_tag = name_to_tag.select {|key| key.downcase == tag.downcase}.first[1]

    if returned_tag.nil?
      first_tag = tag.split(" ")[0]
      returned_tag = name_to_tag.select {|key| key.downcase.include?(first_tag)}.first[1]
    end
    return returned_tag
  end
end
