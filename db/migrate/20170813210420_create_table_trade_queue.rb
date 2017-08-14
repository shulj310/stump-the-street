class CreateTableTradeQueue < ActiveRecord::Migration[5.0]
  def change
    create_table :table_trade_queues do |t|
      t.belongs_to :portfolio, null: false
      t.belongs_to :stock, null: false
      t.integer :shares, null: false
      t.boolean :side, null: false, default: true

      t.timestamps

    end
  end
end
