require 'rails_helper'

RSpec.describe Api::V1::PortfoliosController, type: :controller do

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
        value: 100,
        cash: 100,
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

    let!(:position){
      Position.create(
        portfolio_id: portfolio.id,
        shares:100,
        stock_id:stock.id,
        value:100,
        cost:95
      )
    }

    describe 'GET#show' do
    it ('should return all pertinent portfolio information for specific portfolio') do
      sign_in user
      get :show, params: { id:portfolio.id,competition_id:'show'}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 9

      expect(returned_json['cash']).to eq 100
      expect(returned_json['name']).to eq "Test Port"
      expect(returned_json['competition']['id']).to eq competition.id
    end
  end
  #   describe "POST#create" do
  #   it "should place a trade and increase number of positions to two" do
  #     post_json = {
  #       ticker:'AAPL',
  #       portfolio_id: portfolio.id,
  #       stock_id: stock.id,
  #       transaction_price:stock.price,
  #       shares: 100,
  #       side: true
  #     }.to_json
  #     sign_in user
  #
  #     post(:create, params: { portfolio_id:portfolio.id, competition_id:'trade'}, body:post_json)
  #
  #     returned_json = JSON.parse(response.body)
  #     expect(response.status).to eq 200
  #
  #
  #     expect(returned_json).to be_kind_of(Hash)
  #     expect(returned_json).to_not be_kind_of(Array)
  #     expect(returned_json['stock']['id']).to eq 2
  #     expect(returned_json['stock']['ticker']).to eq "AAPL"
  #     expect(returned_json['shares']).to eq 100
  #   end
  # end
  #   describe "POST#create" do
  #   it "should not be able to trade unless signed in" do
  #     post_json = {
  #       ticker:'AAPL',
  #       portfolio_id: portfolio.id,
  #       stock_id: stock.id,
  #       transaction_price:stock.price,
  #       shares: 100,
  #       side: true
  #     }.to_json
  #
  #     post(:create, params: { portfolio_id:portfolio.id, competition_id:'trade'}, body:post_json)
  #
  #     returned_json = JSON.parse(response.body)
  #     expect(response.status).to eq 200
  #
  #
  #     expect(returned_json).to be_kind_of(Hash)
  #     expect(returned_json).to_not be_kind_of(Array)
  #     expect(returned_json['auth']).to eq false
  #   end
  # end
end
