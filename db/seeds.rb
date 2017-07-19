# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Stock.create(
  name: "Netflix",
  price: 183.60,
  ticker:"NFLX"
)
Stock.create(
name: "Charles Schwab",
price: 42.86,
ticker:"SCHW"
)
Stock.create(
name: "Tesla",
price: 328.24,
ticker:"TSLA"
)
Stock.create(
name: "Intuitive Surgical",
price: 946.65,
ticker:"ISRG"
)
Stock.create(
name: "Herbalife",
price: 72.09,
ticker:"HLF"
)
Stock.create(
name: "Equity Residential",
price: 66.05,
ticker:"EQR"
)
