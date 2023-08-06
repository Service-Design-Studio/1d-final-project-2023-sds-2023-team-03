module ProductInsights
    def ProductInsights.apply_selling_fast(product, sls)
        product_id = product["product_id"]
        sales_last_month = sls.where("product_id = ? AND date >= ? AND date <= ?", product_id, 30.days.ago.to_date, Time.now.to_date)

        if(!sales_last_month)
            total_sales = 0
        else
            total_sales = sales_last_month.sum(:sales)
        end

        top_5 = Sale.top_sales_time_range(5, 30.days.ago.to_date, Time.now.to_date)

        if (total_sales >= 100 && top_5.key?(product_id))
            insight = {
                :name => :selling_fast,
                :text => "Product is in top 5 sales in the last 30 days with #{total_sales} sales!",
                :severity => ProductInsights.severity[0]
            }
            product[:insights].append insight
        elsif (total_sales >= 100)
            insight = {
                :name => :selling_fast,
                :text => "Product is very popular with #{total_sales} sales in the last 30 days!",
                :severity => ProductInsights.severity[1]
            }
            product[:insights].append insight
        end
    end
end