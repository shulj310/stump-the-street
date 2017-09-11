class CreateTrendingTickers < ActiveRecord::Migration[5.0]
  def change
    create_table :trending_tickers do |t|
      t.string :ticker, null: false
      t.belongs_to :stock, null: false
      t.string :new_url, null: false
    end
  end
end
