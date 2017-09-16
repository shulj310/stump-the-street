class AddHistoricalDetailsToCompetition < ActiveRecord::Migration[5.0]
  def change
    add_column :competitions, :win, :boolean
    add_index :competitions, :win
    add_column :competitions, :return, :float
    add_column :competitions, :winnings, :float
    add_column :competitions, :status, :integer, null: false, default: 0
    add_column :competitions, :starts_at, :datetime
    add_column :competitions, :max_users, :integer
    add_column :competitions, :private, :boolean, null: false, default: false
    add_column :competitions, :secret_key, :string
    drop_table :competition_histories
  end
end
