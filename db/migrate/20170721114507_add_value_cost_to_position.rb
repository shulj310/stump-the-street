class AddValueCostToPosition < ActiveRecord::Migration[5.0]
  def change
    add_column :positions, :value, :float, null: false
    add_column :positions, :cost, :float, null: false
  end
end
