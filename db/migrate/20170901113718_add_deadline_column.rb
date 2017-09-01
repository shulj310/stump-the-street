class AddDeadlineColumn < ActiveRecord::Migration[5.0]
  def change
    add_column :limit_orders, :deadline, :datetime, null: false
  end
end
