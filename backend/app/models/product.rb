class Product < ApplicationRecord
    # Acess sales from a product with product.sales
    def sales
        Sale.where(product_id: self.product_id)
    end

    # Queries for FOUR lowest stock, descending order
    def self.bottom_four
        products = Product.all
        products = products.order(stock: :desc)
        products = products.last(4)
    end

    # Searches for ALL products in a category
    def self.search_category(cat)
        products = Product.all
        products = products.where('lower(product_category) = ?', cat.downcase)
    end

    # Filters query to a specific category
    def self.filter_category(q, cat)
        products = q.where('lower(product_category) = ?', cat.downcase)
    end
end