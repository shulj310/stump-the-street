class ChangeCashToCost < ActiveRecord::Migration[5.0]
  def change
    rename_column :portfolios, :cost, :cash
  end
end
