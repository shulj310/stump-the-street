require 'rails_helper'
require 'thor'
load File.join(Rails.root.join('lib/tasks/trade_queue_fill.thor'))

describe TradeQueueFill do
  before(:each) do
    allow_any_instance_of(Market).to receive(:current_time).and_return(Time.zone.local(2017,8,1,14,0,0))
  end

  before(:all) do
    @user =
      User.create(
      first_name: "David",
      last_name: "Hasselhoff",
      email: "something@something.com",
      password: "12345678",
      dob: "03/10/1990",
      zip: "02111",
      country: "USA"
      )

    @competitor =
      Competitor.create(
        name:"Cramer",
        image_url: "http//www.espn.com/images"
      )

    @competition =
      Competition.create(
        length:4,
        deadline:Date.new(2017,8,8),
        wager_amount:100,
        odds_calculated:1,
        current_value:95,
        user_id:@user.id,
        competitor_id:@competitor.id
      )

    @poor_competition =
      Competition.create(
        length:4,
        deadline:Date.new(2017,8,8),
        wager_amount:100,
        odds_calculated:1,
        current_value:95,
        user_id:@user.id,
        competitor_id:@competitor.id
      )

    @portfolio =
      Portfolio.create(
        name:"Test Port",
        value: 100000,
        cash: 100000,
        return: 0,
        competition_id:@competition.id
      )

    @poor_portfolio =
      Portfolio.create(
        name:"Test Port",
        value: 0,
        cash: 0,
        return: 0,
        competition_id:@poor_competition.id
      )

    @stock =
      Stock.create(
      ticker:"AAPL",
      name:"Apple",
      price:100)
  end

  describe 'open_trade' do
    it 'performs trade when parameters are correct' do
      # buy shares
      TradeQueue.create(
        portfolio_id:@portfolio.id,
        stock_id:@stock.id,
        shares:100,
        side:true
      )

      expect{
        TradeQueueFill.new.open_trade
      }.to change{@portfolio.positions.where('shares>0').count}.by(1)

      # sell shares
      TradeQueue.create(
        portfolio_id:@portfolio.id,
        stock_id:@stock.id,
        shares:100,
        side:false
      )

      expect{
        TradeQueueFill.new.open_trade
      }.to change{@portfolio.positions.where('shares>0').count}.by(-1)


      # attempt to sell non-existing shares and fail
      TradeQueue.create(
        portfolio_id:@portfolio.id,
        stock_id:@stock.id,
        shares:100,
        side:false
      )

      expect{
        TradeQueueFill.new.open_trade
      }.to_not change{@portfolio.positions.where('shares>0').count}
    end


    it 'refuses to create trade when balance is insufficient' do
      TradeQueue.create(
        portfolio_id:@poor_portfolio.id,
        stock_id:@stock.id,
        shares:100,
        side:true
      )

      expect{
        TradeQueueFill.new.open_trade
      }.to_not change{@poor_portfolio.positions.where('shares>0').count}
    end
  end
end