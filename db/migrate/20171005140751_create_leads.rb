class CreateLeads < ActiveRecord::Migration[5.0]
  def change
    create_table :leads do |t|
      t.string :name
      t.string :email
      t.boolean :beta
      t.text :referer

      t.timestamps
    end
  end
end
