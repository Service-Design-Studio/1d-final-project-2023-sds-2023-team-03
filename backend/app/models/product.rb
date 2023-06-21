class Product < ApplicationRecord
    def self.category_time_query(start_date, end_date, category)
        products = Product.all
        products = products.where("lower(product_category) = ?", category) if category
        products = products.where(date: start_date..end_date) if start_date && end_date
        products
    end
end
