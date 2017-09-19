require 'rails_helper'
require_relative('../../lib/tasks/dash/CompetitionPrep')

RSpec.describe CompetitionMailer, type: :mailer do
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

  let!(:user_b) {
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

  let!(:group_competition) {
    Competition.create(
      length:4,
      deadline:Date.new(2017,8,8),
      wager_amount:100,
      odds_calculated:1,
      current_value:95,
      user_id:user.id,
    )
  }

  let!(:portfolio) {
    Portfolio.create(
      name:"Test Port",
      value: 100,
      cash: 100000,
      return: 0,
      competition_id:competition.id
    )
  }

  let!(:group_portfolio_a) {
    Portfolio.create(
      name:"Test Port",
      value: 100,
      cash: 100000,
      return: 0,
      competition:group_competition,
      user: user,
    )
  }

  let!(:group_portfolio_b) {
    Portfolio.create(
      name:"Test Port",
      value: 100,
      cash: 100000,
      return: 0,
      competition:group_competition,
      user: user_b,
    )
  }

  let!(:competitor_portfolio) {
    CompetitorPortfolio.create!(
      competition_id: competition.id,
      value: 1000000,
      cost: 1000000,
      return: 0
    )
  }

  before(:all) do
    Stock.create(
    ticker:"SPY",
    name:"SPY",
    price:100)
  end

  describe "end_of_day" do
    it 'sends an email' do
      expect(portfolio.competition.is_group?).to be false
      portfolio.competition.touch

      expect(group_portfolio_a.competition.is_group?).to be true
      expect(group_portfolio_a.competition_id).to equal(group_portfolio_b.competition_id)
      group_portfolio_a.competition.touch

      # Create the email and store it for further assertions
      email = CompetitionMailer.end_of_day(user, [CompetitionPrep.new(portfolio, 1), CompetitionPrep.new(group_portfolio_a, 1)])

      # Send the email, then test that it got queued
      assert_emails 1 do
        email.deliver_now
      end
    end
  end
end