require 'rails_helper'

RSpec.describe Api::V1::CompetitionsController, type: :controller do

    let!(:user) {
      User.create(
      first_name: "David",
      last_name: "Hasselhoff",
      email: "something@something.com",
      password: "12345678",
      dob: "03/10/1990",
      zip: "02111",
      country: "USA",
      wallet:100
      )
    }

    let!(:competitor) {
      Competitor.create(
        name:"Cramer",
        image_url: "http//www.espn.com/images"
      )
    }

    let!(:spy) {
      Stock.create(
        ticker:"SPY",
        name: "S&P 500",
        price: 100
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

    let!(:competitor_portfolio) {
      CompetitorPortfolio.create(
      competition_id:competition.id,
      value:1000,
      cost:1000,
      return:0
      )
    }

    let!(:portfolio) {
      Portfolio.create(
        name:"Test Port",
        value: 1000000,
        cash: 1000000,
        return: 0,
        competition_id:competition.id
      )
    }

    describe 'GET#index' do
    it ('should return all the competitions for the user signed in') do
      sign_in user
      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json[0]['id']).to eq competition.id
      expect(returned_json[0]['name']).to eq portfolio.name
      expect(returned_json[0]['diff']).to eq (portfolio.return - competitor_portfolio.return)
    end
  end
    describe "POST#create" do
    it "should create a new competition if signed in" do

      user.wallet += 100
      user.save

      post_json = {
        length: 8,
        wager_amount: 50,
        competitor_id: competitor.id,
        name: "Port Test Two"
      }.to_json
      sign_in user

      post(:create, body:post_json)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['length']).to eq 8
      expect(returned_json['user_id']).to eq user.id
    end
  end
    describe "POST#create" do
    it "should not create a new competition if signed out" do
      post_json = {
        length: 8,
        wager_amount: 5000,
        competitor_id: competitor.id,
        name: "Port Test Two"
      }.to_json

      post(:create, body:post_json)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['auth']).to eq false
    end
  end
end
