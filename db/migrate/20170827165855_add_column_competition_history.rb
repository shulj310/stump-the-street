class AddColumnCompetitionHistory < ActiveRecord::Migration[5.0]
  def change
    add_column :competition_histories, :length, :integer
  end
end
