class AddDateColumnToCompetitors < ActiveRecord::Migration[7.0]
  def change
    add_column :competitors, :date, :date
  end
end
