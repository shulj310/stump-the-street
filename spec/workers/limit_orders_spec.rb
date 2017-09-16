require 'rails_helper'

RSpec.describe LimitOrders do
  let!(:user) {
    User.create_with(
    first_name: "David",
    last_name: "Hasselhoff",
    password: "12345678",
    dob: "03/10/1990",
    zip: "02111",
    country: "USA"
    ).find_or_create_by(email: "something@something.com")
  }

  let!(:competitor) {
    Competitor.create!(
      name:"Cramer",
      image_url: "http//www.espn.com/images"
    )
  }

  let!(:competition) {
    Competition.create!(
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
    Portfolio.create!(
      name:"Test Port",
      value: 100000,
      cash: 100000,
      return: 0,
      competition_id:competition.id,
      user: user,
    )
  }

  let!(:stock) {
    Stock.create!(
    ticker:"AAPL",
    name:"Apple",
    price:100)
  }

  it 'should process order only when price is below treshold' do
    order = LimitOrder.create!({
      stock: stock,
      price: 99,
      side: true,
      shares: 1,
      portfolio_id: portfolio.id,
    })

    expect{
      LimitOrders.new.perform('AAPL', 'ask', 100)
      LimitOrders.new.perform('AAPL', 'bid', 90)
    }.to_not change{Trade.all.count}

    expect{
      LimitOrders.new.perform('AAPL', 'ask', 99)
    }.to change{Trade.all.count}.by(1)
  end
end