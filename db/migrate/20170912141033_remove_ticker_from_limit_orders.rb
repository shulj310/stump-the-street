class RemoveTickerFromLimitOrders < ActiveRecord::Migration[5.0]
  def change
    remove_column :limit_orders, :ticker, :string
  end
end
