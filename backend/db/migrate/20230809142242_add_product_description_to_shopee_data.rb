class AddProductDescriptionToShopeeData < ActiveRecord::Migration[7.0]
  def change
    add_column :shopee_data, :product_description, :string
  end
end
