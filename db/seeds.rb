# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
  first_name: "Jared",
  last_name: "Shulman",
  dob: Date.new(1990,3,10),
  zip: "02111",
  country: "USA",
  email: "shulman.jared@gmail.com",
  password: "pass123",
  admin: true
)

Competitor.create(
  name: "Market",
  image_url: "app/assets/images/market.png"
)

Competition.create(
  length: 30,
  deadline: DateTime.now + 30,
  wager_amount: 100,
  odds_calculated: 1.0,
  current_value: 90,
  user_id: 1,
  competitor_id: 1
)

Portfolio.create(
  name: "Going Long!",
  value: 0,
  cash: 1000000,
  return: 0.0,
  competition_id: 1
)
