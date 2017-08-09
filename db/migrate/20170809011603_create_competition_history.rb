class CreateCompetitionHistory < ActiveRecord::Migration[5.0]
  def change
    create_table :competition_histories do |t|
      t.belongs_to :user
      t.boolean :win, null: false
      t.float :wager_amount, null: false
      t.integer :competitor_id, null: false
      t.float :return, null: false
      t.float :competitor_return, null: false

      t.timestamps
    end
  end
end
