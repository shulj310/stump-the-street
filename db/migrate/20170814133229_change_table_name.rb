class ChangeTableName < ActiveRecord::Migration[5.0]
  def up
    rename_table :table_trade_queues, :trade_queues
  end

  def down
    rename_table :trade_queues, :table_trade_queues
  end
end
