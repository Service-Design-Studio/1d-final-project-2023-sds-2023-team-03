class CreateCompetitors < ActiveRecord::Migration[7.0]
  def change
    create_table :competitors do |t|
      t.integer :product_id
      t.string :product_category
      t.string :product_type
      t.string :product_name
      t.float :price
      t.integer :stock
      t.integer :sales

      t.timestamps
    end
  end
end
