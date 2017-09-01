class AddBelongsTo < ActiveRecord::Migration[5.0]
  def change
    add_column :limit_orders, :portfolio_id, :integer, null: false
  end
end
