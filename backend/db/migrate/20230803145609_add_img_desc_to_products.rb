class AddImgDescToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :description, :text
    add_column :products, :image_link, :text
    prods = Product.where('image_link IS NULL and description IS NULL')
    prods.destroy_all
  end
end
