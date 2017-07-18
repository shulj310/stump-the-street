class CreatePositions < ActiveRecord::Migration[5.0]
  def change
    create_table :positions do |t|
      t.belongs_to :portfolio, null: false
      t.integer :shares, null: false
      
      t.timestamps
    end
  end
end
