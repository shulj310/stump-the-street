class AddBelongsToCompetitionUser < ActiveRecord::Migration[5.0]
  def change
    add_column :competitions, :user_id ,:integer, null: false
  end
end
