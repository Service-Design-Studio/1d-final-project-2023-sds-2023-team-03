class Product < ApplicationRecord
    # Queries for stock < 50
    def self.products_below_50
        products = Product.all
        products = products.where(stock: ..50)
        products = products.order(stock: :desc)
    end

    # Searches for ALL products in a category
    def self.search_category(cat)
        products = Product.all
        products = products.where('lower(product_category) = ?', cat)
    end

    # Filters query to a specific category
    def self.filter_category(q, cat)
        products = q.where('lower(product_category) = ?', cat)
    end
end
