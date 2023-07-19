class AddColumnToCompetitors < ActiveRecord::Migration[7.0]
  def change
    add_column :competitors, :competitor_name, :string
  end
end
