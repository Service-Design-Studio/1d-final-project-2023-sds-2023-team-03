module GlobalInsights
    def GlobalInsights.apply_top_bottom_sales(**input_hash)
        products = input_hash[:products]
        top = Sale.top_sales_time_range(1, 30.days.ago.to_date, Time.now.to_date)
        bottom = Sale.bottom_sales_time_range(1, 30.days.ago.to_date, Time.now.to_date)

        top_product_id = top.keys[0]
        top_product_name = products.find_by(:product_id => top_product_id).product_name
        top_units_sold = top[top_product_id]

        bottom_product_id = bottom.keys[0]
        bottom_product_name = products.find_by(:product_id => bottom_product_id).product_name
        bottom_units_sold = bottom[bottom_product_id]

        grade = InsightsConfig.severity[-1]
        insight = {
            :name => :top_bottom_sales,
            :text => "Your top-selling product this month is #{top_product_name} with #{top_units_sold} sales, while your bottom-selling product this month is #{bottom_product_name} with #{bottom_units_sold} sales.",
            :type => :sales,
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }
    end
end