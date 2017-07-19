class WalletDefault < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :wallet
    add_column :users, :wallet, :float, null: false, default: 0
  end
end
