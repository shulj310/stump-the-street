class AddColumnsToStock < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :sector, :string
    add_column :stocks, :sic, :string
  end
end
