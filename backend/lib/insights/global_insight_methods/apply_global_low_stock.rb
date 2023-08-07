module GlobalInsights
    def GlobalInsights.apply_global_low_stock(**input_hash)
        products = input_hash[:products]

        qty_restock = 0

        products.each do |product|
            product_id = product.product_id
            sales_last_month = Sale.product_time_query(product_id, 30.days.ago.to_date, Time.now.to_date).sum(:sales)
            if (product.stock < sales_last_month)
                qty_restock += 1
            end
        end

        grade = InsightsConfig.severity[0]
        if (qty_restock > 0 && qty_restock <= 10)
            grade = InsightsConfig.severity[3]
        elsif (qty_restock > 10)
            grade = InsightsConfig.severity[4]
        end

        insight = {
            :name => :global_low_stock,
            :text => "There are #{qty_restock} products you may want to consider restocking.",
            :type => :products,
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }

        return insight
    end
end