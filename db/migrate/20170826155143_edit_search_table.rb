class EditSearchTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :search_histories, :user_id_id, :user_id
  end
end
