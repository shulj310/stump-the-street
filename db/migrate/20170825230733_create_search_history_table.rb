class CreateSearchHistoryTable < ActiveRecord::Migration[5.0]
  def change
    create_table :search_histories do |t|
      t.string :ticker
      t.string :fields
      t.belongs_to :user_id

      t.timestamps
    end
  end
end
