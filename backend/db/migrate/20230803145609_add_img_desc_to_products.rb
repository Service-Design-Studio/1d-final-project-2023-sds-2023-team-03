class AddImgDescToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :description, :text
    add_column :products, :image_link, :text
  end
end
