class Sale < ApplicationRecord
    # Access product from a sale with sale.product
    def product
        Product.find_by(product_id: self.product_id)
    end

    # queries for sales that match the category, whose dates are in between start/end
    def self.category_time_query(start_date, end_date, category)
        sales = Sale.all
        if (category != 'overall')
            sales = sales.where("lower(product_category) = ?", category)
        end
        sales = sales.where(date: start_date..end_date)
    end

    def self.product_time_query(product_id, start_date, end_date)
        sales = Sale.where('product_id = ? AND date >= ? AND date <= ?', product_id, start_date, end_date)
    end

    # turns the query into a hash containing 2 fields:
    #   x_axis: names of sales (array)
    #   y_axis: number of sales of sales (array)
    # the two fields have 1:1 mapping
    def self.sales_frequency(sales)
      hash = {}
      sales.each do |p|
        if hash[p.product_id]
          hash[p.product_id] += p.sales
        else
          hash[p.product_id] = p.sales
        end
      end
    
      hash = hash.sort_by {|k, v| v}.reverse.to_h
      hash = hash.transform_keys! { |k| sales.find_by(product_id: k).product_name }

      {x_axis: hash.keys, y_axis: hash.values}
    end


    # turns the query into a hash containing 2 fields:
    #   x_axis: names of sales (array)
    #   y_axis: total revenue of sales (array)
    # the two fields have 1:1 mapping
    def self.sales_revenue(sales)
        hash = {}
        sales.each do |p|
            if hash[p.product_id] then
                hash[p.product_id] += p.price * p.sales
            else
                hash[p.product_id] = p.price * p.sales
            end
        end

        # sort the hash before stripping keys/values
        hash = hash.sort_by {|k, v| v}.reverse.to_h
        hash = hash.transform_keys! { |k| sales.find_by(product_id: k).product_name }


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

    def self.top_categories_date(start_date, end_date)
        sales_out = {}
        units_out = {}
        sales = Sale.all
        sales = sales.where(date: start_date..end_date)
        sales.each do |sale|
            category = sale.product_category
            sales_num = sale.sales
            price = sale.price
            total = sales_num * price

            if sales_out[category] then
                sales_out[category] += total
            else
                sales_out[category] = total
            end

            if units_out[category] then
                units_out[category] += sales_num
            else
                units_out[category] = sales_num
            end
        end

        units_out.sort_by {|k, v| v}.reverse.to_h
        sales_out.sort_by {|k, v| v}.to_h

        out = {
            :units => units_out,
            :amount => sales_out
        }
    end

    def self.top_sales_time_range(place, start_date, end_date)
        sales = Sale.where('date >= ? AND date <= ?', start_date, end_date)
        out = {}

        sales.each do |sale|
            if (out[sale.product_id])
                out[sale.product_id] += sale.sales
            else
                out[sale.product_id] = sale.sales
            end
        end 
        
        Hash[out.sort_by {|k, v| v}.reverse[0...place]]
    end

    def self.bottom_sales_time_range(place, start_date, end_date)
        sales = Sale.where('date >= ? AND date <= ?', start_date, end_date)
        out = {}

        sales.each do |sale|
            if (out[sale.product_id])
                out[sale.product_id] += sale.sales
            else
                out[sale.product_id] = sale.sales
            end
        end 
        
        Hash[out.sort_by {|k, v| v}[0...place]]
    end
end
