class RemoveNullValuesFromProducts < ActiveRecord::Migration[7.0]
  def change
    prods = Product.where('units_sold IS NULL')
    prods.destroy_all
  end
end
