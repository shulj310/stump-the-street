class AddColumnCouponBooleanUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :used_code, :boolean, default: false
  end
end
