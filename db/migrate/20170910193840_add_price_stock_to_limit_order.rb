class AddPriceStockToLimitOrder < ActiveRecord::Migration[5.0]
  def change
    add_column :limit_orders, :price, :float
    add_index :limit_orders, :price
    add_reference :limit_orders, :stock, foreign_key: true
  end
end
