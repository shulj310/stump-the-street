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

    describe 'GET#index' do
    it ('should return all the competitions for the user signed in') do
      sign_in user
      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json[0]['id']).to eq competition.id
      expect(returned_json[0]['wager_amount']).to eq competition.wager_amount
      expect(returned_json[0]['user_id']).to eq user.id
      expect(returned_json[0]['portfolio']['name']).to eq portfolio.name
    end
  end
    describe "POST#create" do
    it "should create a new competition if signed in" do

      post_json = {
        length: 8,
        wager_amount: 5000,
        competitor_id: competitor.id,
        name: "Port Test Two"
      }.to_json
      sign_in user

      post(:create, body:post_json)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['wager_amount']).to eq 5000
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
