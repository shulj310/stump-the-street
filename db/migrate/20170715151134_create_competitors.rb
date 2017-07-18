class CreateCompetitors < ActiveRecord::Migration[5.0]
  def change
    create_table :competitors do |t|
      t.string :name, null: false
      t.string :image_url, null: false
    end
  end
end
