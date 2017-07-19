class CreateStocks < ActiveRecord::Migration[5.0]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.integer :price, null: false
      t.string :name, null: false
    end
  end
end
