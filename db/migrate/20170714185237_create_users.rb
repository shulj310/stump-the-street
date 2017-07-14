class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.boolean :authorization, null: false
      t.date :dob, null: false
      t.string :zip_code, null: false
      t.string :country, null: false
      t.float :wallet, null: false

      t.timestamps
    end
  end
end
