class AddCategoryToShopeeData < ActiveRecord::Migration[7.0]
  def change
    add_column :shopee_data, :category, :string
  end
end
