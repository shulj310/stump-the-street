class CreateTrades < ActiveRecord::Migration[5.0]
  def change
    create_table :trades do |t|
      t.belongs_to :portfolio, null: false
      t.belongs_to :stock, null: false
      t.float :transaction_price, null: false
      t.integer :shares, null: false

      t.timestamps
    end
  end
end
