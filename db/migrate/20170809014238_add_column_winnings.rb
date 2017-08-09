class AddColumnWinnings < ActiveRecord::Migration[5.0]
  def change
    add_column :competition_histories, :winnings, :float
  end
end
