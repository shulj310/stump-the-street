class AddBelongsToCompetition < ActiveRecord::Migration[5.0]
  def change
    add_column :competitor_portfolios, :competition_id, :integer, null: false
    remove_column :competitor_portfolios, :competitor_id
    add_column :competitions, :competitor_id, :integer, null: false
  end
end
