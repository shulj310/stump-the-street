class AddDiffColumn < ActiveRecord::Migration[5.0]
  def change
    add_column :competitions, :diff, :float
  end
end
