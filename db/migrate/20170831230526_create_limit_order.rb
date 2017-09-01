class CreateLimitOrder < ActiveRecord::Migration[5.0]
  def change
    create_table :limit_orders do |t|
      t.string :ticker, null: false
      t.boolean :side, null: false, default: true
      t.integer :shares, null: false

      t.timestamps
    end
  end
end
