require 'rails_helper'

RSpec.describe Api::V1::PortfoliosController, type: :controller do

    let!(:spy) {Stock.create(
      ticker:"SPY",
      name:"S&P 500",
      price:100
    )
  }

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

    let!(:competitor_portfolio) {
      CompetitorPortfolio.create(
        value:100,
        cost:100,
        return:0,
        competition_id:competition.id
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


    describe 'GET#show' do
    it ('should return all pertinent portfolio information for specific portfolio') do
      sign_in user
      get :show, params: { id:portfolio.id,competition_id:'show'}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1

      expect(returned_json[0]['id']).to eq portfolio.id
      expect(returned_json[0]['name']).to eq portfolio.name
      expect(returned_json[0]['wager_amount']).to eq competition.wager_amount
      expect(returned_json[0]["return"]).to eq portfolio.return
    end
  end
end
