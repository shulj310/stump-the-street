class AddSideToTrade < ActiveRecord::Migration[5.0]
  def change
    add_column :trades, :side, :boolean, null: false
    add_column :users, :admin, :boolean, default: false
  end
end
