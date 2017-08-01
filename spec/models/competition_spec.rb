require 'rails_helper'

RSpec.describe Competition, :type => :model do

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

  subject {
    described_class.new(
      length:4,
      deadline:Date.new(2017,8,8),
      wager_amount:100,
      odds_calculated:1,
      current_value:95,
      user_id:user.id,
      competitor_id:competitor.id
    )
  }


  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid with valid attributes" do
    expect(subject).to be_valid
  end
end
