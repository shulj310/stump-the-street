class ChangeCompetitions < ActiveRecord::Migration[5.0]
  def change
    change_column_null(:competitions, :competitor_id, true)
  end
end
