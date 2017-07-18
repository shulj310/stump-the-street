class AddStockIdPositions < ActiveRecord::Migration[5.0]
  def change
    add_column :positions, :stock_id, :integer, null: false
  end
end
