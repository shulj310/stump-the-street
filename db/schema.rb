# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170718014753) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "competitions", force: :cascade do |t|
    t.integer  "length",          null: false
    t.datetime "deadline",        null: false
    t.integer  "wager_amount",    null: false
    t.float    "odds_calculated", null: false
    t.float    "current_value",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "user_id",         null: false
    t.integer  "competitor_id",   null: false
  end

  create_table "competitor_portfolios", force: :cascade do |t|
    t.float    "return",         null: false
    t.float    "value",          null: false
    t.float    "cost",           null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "competition_id", null: false
  end

  create_table "competitors", force: :cascade do |t|
    t.string "name",      null: false
    t.string "image_url", null: false
  end

  create_table "portfolios", force: :cascade do |t|
    t.string   "name",           null: false
    t.float    "value",          null: false
    t.float    "cost",           null: false
    t.float    "return",         null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "competition_id", null: false
  end

  create_table "positions", force: :cascade do |t|
    t.integer  "portfolio_id", null: false
    t.integer  "shares",       null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "stock_id",     null: false
    t.index ["portfolio_id"], name: "index_positions_on_portfolio_id", using: :btree
  end

  create_table "trades", force: :cascade do |t|
    t.integer  "portfolio_id",      null: false
    t.integer  "stock_id",          null: false
    t.float    "transaction_price", null: false
    t.integer  "shares",            null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["portfolio_id"], name: "index_trades_on_portfolio_id", using: :btree
    t.index ["stock_id"], name: "index_trades_on_stock_id", using: :btree
  end

end
