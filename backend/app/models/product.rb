class Product < ApplicationRecord
    
    # queries for sales that match the category, whose dates are in between start/end
    def self.category_time_query(start_date, end_date, category)
        products = Product.all
        products = products.where("lower(product_category) = ?", category)
        products = products.where(date: start_date..end_date)
    end


    # turns the query into a hash containing 2 fields:
    #   x_axis: names of product (array)
    #   y_axis: number of sales of product (array)
    # the two fields have 1:1 mapping
    
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

        # output
        {
            "x_axis" => hash.keys,
            "y_axis" => hash.values
        }
    end
end
