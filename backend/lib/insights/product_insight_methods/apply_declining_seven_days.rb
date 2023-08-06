module ProductInsights
    def ProductInsights.apply_declining_seven_days(product, sls)
        product_id = product["product_id"]
        sold_days = {}
        (1..7).to_a.each do |day|
            product_sales = sls.where('product_id = ? AND date = ?', product_id, day.days.ago.to_date)
            if (!product_sales)
                sold_days[day] = 0
                next
            end
            qty_sold = product_sales.sum(:sales)
            sold_days[day] = qty_sold
        end

        days_under = 0
        sales_last_week = sold_days[7]
        threshold = (sales_last_week * 0.1).ceil
        sold_days.keys.each do |day|
            diff = sales_last_week - sold_days[day]

            if diff < threshold || diff == 0
                next
            else
                days_under += 1
            end
        end
        
        if days_under < 4
            return
        else
            insight = {
                :name => :declining_seven_days,
                :text => "This product has been declining in sales in the past 7 days.",
                :severity => {
                    :label => InsightsConfig.severity[3],
                    :level => InsightsConfig.severity.key(InsightsConfig.severity[3])
                }
            }

            product[:insights].append insight
        end
    end
end