require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :controller do
  before(:each) do
    allow(Time).to receive(:now).and_return(Time.new(2017,8,1,14,0,0).utc)
  end

    let!(:user) {
      User.create(
      first_name: "David",
      last_name: "Hasselhoff",
      email: "something@something.com",
      password: "12345678",
      dob: "03/10/1990",
      zip: "02111",
      country: "USA"
      )
    }

    let!(:competitor) {
      Competitor.create(
        name:"Cramer",
        image_url: "http//www.espn.com/images"
      )
    }

    let!(:competition) {
      Competition.create(
        length:4,
        deadline:Date.new(2017,8,8),
        wager_amount:100,
        odds_calculated:1,
        current_value:95,
        user_id:user.id,
        competitor_id:competitor.id
      )
    }

    let!(:portfolio) {
      Portfolio.create(
        name:"Test Port",
        value: 100000,
        cash: 100000,
        return: 0,
        competition_id:competition.id
      )
    }

    let!(:stock) {
      Stock.create(
      ticker:"AAPL",
      name:"Apple",
      price:100)
    }

    let!(:trade) {
      Trade.create(
      portfolio_id:portfolio.id,
      stock_id:stock.id,
      transaction_price:stock.price,
      shares:100,
      side:true
      )
    }

    describe 'GET#index' do
    it ('should return all the stocks') do
      sign_in user
      get :index, params: { portfolio_id:portfolio.id, competition_id:'show'}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")


      expect(returned_json.length).to eq 1
      expect(returned_json[0]['stock_id']).to eq stock.id
      expect(returned_json[0]['ticker']).to eq stock.ticker
      expect(returned_json[0]['shares']).to eq trade.shares
    end
  end
    describe "POST#create" do
    it "should place a trade and increase number of positions to two" do
      post_json = {
        ticker:'AAPL',
        portfolio_id: portfolio.id,
        stock_id: stock.id,
        transaction_price:stock.price,
        shares: 100,
        side: true
      }.to_json
      sign_in user

      post(:create, params: { portfolio_id:portfolio.id, competition_id:'trade'}, body:post_json)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['stock']['id']).to eq stock.id
      expect(returned_json['stock']['ticker']).to eq stock.ticker
      expect(returned_json['shares']).to eq portfolio.positions.first.shares
    end
  end
    describe "POST#create" do
    it "should not be able to trade unless signed in" do
      post_json = {
        ticker:'AAPL',
        portfolio_id: portfolio.id,
        stock_id: stock.id,
        transaction_price:stock.price,
        shares: 100,
        side: true
      }.to_json

      post(:create, params: { portfolio_id:portfolio.id, competition_id:'trade'}, body:post_json)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200


      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['auth']).to eq false
    end
  end
  describe "GET#fund_data"
  it "should get the fund data for a certain stock" do
    sign_in user
    get :fund_data, params: { stock_id:"AAPL"}

    returned_json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(response.content_type).to eq("application/json")

    expect(returned_json).to be_kind_of(Hash)
    expect(returned_json).to_not be_kind_of(Array)
    expect(returned_json['symbol']).to eq "AAPL"

  end
end
