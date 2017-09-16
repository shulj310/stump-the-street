class AddWonToPortfolio < ActiveRecord::Migration[5.0]
  def change
    add_column :portfolios, :won, :boolean
    remove_column :competitions, :win
  end
end
