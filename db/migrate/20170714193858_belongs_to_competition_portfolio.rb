class BelongsToCompetitionPortfolio < ActiveRecord::Migration[5.0]
  def change
    remove_column :competitions, :portfolio_id
    add_column :portfolios, :competition_id, :integer, null: false
  end
end
