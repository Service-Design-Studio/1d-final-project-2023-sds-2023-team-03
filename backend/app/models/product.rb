class Product < ApplicationRecord
    def self.category_time_query(start_date, end_date, category)
        products = Product.all
        products = products.where("lower(product_category) = ?", category)
        products = products.where(date: start_date..end_date)
    end

    def self.sales_frequency(start_date, end_date, category)
        products = self.category_time_query(start_date, end_date, category)
        hash = {}
        products.each do |p|
            if hash[p.product_name] then
                hash[p.product_name] += p.sales
            else
                hash[p.product_name] = p.sales
            end
        end
        hash
    end
end
