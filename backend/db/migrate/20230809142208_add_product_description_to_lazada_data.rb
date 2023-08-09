class AddProductDescriptionToLazadaData < ActiveRecord::Migration[7.0]
  def change
    add_column :lazada_data, :product_description, :string
  end
end
