class ChangeColumnNameNewToNews < ActiveRecord::Migration[5.0]
  def change
    rename_column :trending_tickers, :new_url, :news_url
  end
end
