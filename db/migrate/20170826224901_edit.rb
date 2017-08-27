class Edit < ActiveRecord::Migration[5.0]
  def change
    add_column :search_histories, :session_id, :string
  end
end
