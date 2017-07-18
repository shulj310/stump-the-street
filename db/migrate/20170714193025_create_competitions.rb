class CreateCompetitions < ActiveRecord::Migration[5.0]
  def change
    create_table :competitions do |t|
      t.belongs_to :portfolio, null: false
      t.integer :length, null: false
      t.datetime :deadline, null: false
      t.integer :wager_amount, null: false
      t.float :odds_calculated, null: false
      t.float :current_value, null: false

      t.timestamps
    end
  end
end
