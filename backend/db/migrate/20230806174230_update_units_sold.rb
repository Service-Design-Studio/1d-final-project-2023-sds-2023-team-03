class UpdateUnitsSold < ActiveRecord::Migration[7.0]
  def change
    sales = Sale.all
    products = Product.all

    products.each do |product|
      product_sales = sales.where('product_id = ?', product.product_id)
      if (!product_sales)
        next
      end

      qty_sold = 0
      product_sales.each do |sale|
        qty_sold += sale.sales
      end

      product.update(units_sold: qty_sold)
    end
  end
end
