class AddCategoryToLazadaData < ActiveRecord::Migration[7.0]
  def change
    add_column :lazada_data, :category, :string
  end
end
