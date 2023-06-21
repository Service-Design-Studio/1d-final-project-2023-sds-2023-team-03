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
    def self.sales_frequency(products)
        hash = {}
        products.each do |p|
            if hash[p.product_name] then
                hash[p.product_name] += p.sales
            else
                hash[p.product_name] = p.sales
            end
        end

        # sort the hash before stripping keys/values
        hash = hash.sort_by {|k, v| v}.reverse.to_h

        # output
        {
            "x_axis" => hash.keys,
            "y_axis" => hash.values
        }
    end


    # turns the query into a hash containing 2 fields:
    #   x_axis: names of product (array)
    #   y_axis: total revenue of product (array)
    # the two fields have 1:1 mapping
    def self.sales_revenue(products)
        hash = {}
        products.each do |p|
            if hash[p.product_name] then
                hash[p.product_name] += p.price * p.sales
            else
                hash[p.product_name] = p.price * p.sales
            end
        end

        # sort the hash before stripping keys/values
        hash = hash.sort_by {|k, v| v}.reverse.to_h

        # output
        {
            :x_axis => hash.keys,
            :y_axis => hash.values
        }
    end

    def self.top_10_types_category(products)
        hash_frequency = {}
        hash_revenue = {}
        products.each do |p|
            if hash_frequency[p.product_type] then
                hash_frequency[p.product_type] += p.sales
                hash_revenue[p.product_type] += p.sales * p.price
            else
                hash_frequency[p.product_type] = p.sales
                hash_revenue[p.product_type] = p.sales * p.price
            end
        end

        # sort for frequency
        hash_frequency = hash_frequency.sort_by {|k, v| v}.reverse.to_h
        frequency = {
            :x_axis => hash_frequency.keys,
            :y_axis => hash_frequency.values
        }

        # sort for revenue
        hash_revenue = hash_revenue.sort_by {|k, v| v}.reverse.to_h
        revenue = {
            :x_axis => hash_revenue.keys,
            :y_axis => hash_revenue.values
        }

        # output
        {
            :frequency => frequency,
            :revenue => revenue
        }
    end
end
