class RemoveNullDescImgProducts < ActiveRecord::Migration[7.0]
  def change
    prods = Product.where('image_link IS NULL and description IS NULL')
    prods.destroy_all
  end
end
