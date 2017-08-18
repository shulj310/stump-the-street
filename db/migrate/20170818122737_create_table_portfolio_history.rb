class CreateTablePortfolioHistory < ActiveRecord::Migration[5.0]
  def change
    create_table :portfolio_histories do |t|
      t.belongs_to :portfolio, null: false
      t.float :value, null: false
      t.integer :trades_made, null: false

      t.timestamps
    end
  end
end
