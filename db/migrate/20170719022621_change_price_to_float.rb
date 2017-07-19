class ChangePriceToFloat < ActiveRecord::Migration[5.0]
  def change
    remove_column :stocks, :price
    add_column :stocks, :price, :float, null: false
  end
end
