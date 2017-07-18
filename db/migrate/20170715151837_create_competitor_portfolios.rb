class CreateCompetitorPortfolios < ActiveRecord::Migration[5.0]
  def change
    create_table :competitor_portfolios do |t|
      t.belongs_to :competitor, null: false
      t.float :return, null: false
      t.float :value, null: false
      t.float :cost, null: false

      t.timestamps
    end
  end
end
