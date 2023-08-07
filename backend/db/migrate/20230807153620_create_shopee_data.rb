class CreateShopeeData < ActiveRecord::Migration[7.0]
  def change
    create_table :shopee_data do |t|
      t.string :merchant_name
      t.string :keyword
      t.string :competitor_name
      t.string :product_name
      t.string :coupon
      t.float :initial_price
      t.float :final_price
      t.integer :sales
      t.string :product_link
      t.string :product_image_link
      t.date :date_scraped
      t.float :discount

      t.timestamps
    end
  end
end
