module ProductInsights
    def ProductInsights.apply_sales_change(product, sls)
        severity = InsightsConfig.severity
        product_id = product["product_id"]
        sale = sls

        sales_yday = sls.where('product_id = ? AND date = ?', product_id, 1.day.ago.to_date)
        sales_today = sls.where('product_id = ? AND date = ?', product_id, Time.current.to_date)

        if (!sales_yday && !sales_today)
            insight = {
                :name => :sales_change,
                :text => "There were no sales for this product yesterday or today.",
                :severity => {
                    :label => severity[1],
                    :level => severity.key(severity[1])
                }
            }

            product[:insights].append insight
            return
        end

        sold_yday = 0
        sold_today = 0

        if (sales_yday)
            sold_yday = sales_yday.sum(:sales)
        end

        if (sales_today)
            sold_today = sales_today.sum(:sales)
        end

        if (sold_yday == 0 && sold_today != 0)
            insight = {
                :name => :sales_change,
                :text => "Sales for this product has gone from 0 to #{sold_today} in the past 24 hours (#{1.day.ago.to_date}).",
                :severity => {
                    :label => InsightsConfig.severity[0],
                    :level => InsightsConfig.severity.key(InsightsConfig.severity[0])
                }
            }

            product[:insights].append insight
            return
        elsif (sold_yday == 0)
            insight = {
                :name => :sales_change,
                :text => "Sales for this product have not changed since 24 hours ago (#{1.day.ago.to_date}).",
                :severity => {
                    :label => InsightsConfig.severity[2],
                    :level => InsightsConfig.severity.key(InsightsConfig.severity[2])
                }
            }
            product[:insights].append insight
            return
        end


        # calculate change
        change = 0
        if (sold_yday > sold_today)
            change = (sold_today/sold_yday) - 1
        elsif (sold_today > sold_yday)
            change = sold_today/sold_yday
        end

        # calculate severity grade
        grade = {}
        if (change >= 0.25)
            grade = severity[0]
        elsif (change >= 0.1)
            grade = severity[1]
        elsif (change > -0.1)
            grade = severity[2]
        elsif (change <= -0.1 && change > -0.25)
            grade = severity[3]
        elsif (change <= -0.25)
            grade = severity[4]
        end

        if change > 0
            text = "Sales for this product have risen by #{change*100}% since 24 hours ago (#{1.day.ago.to_date})."
        elsif change < 0
            text = "Sales for this product have dropped by #{-(change*100)}% since 24 hours ago (#{1.day.ago.to_date})."
        else
            text = "Sales for this product have not changed since 24 hours ago (#{1.day.ago.to_date})."
        end

        insight = {
            :name => :sales_change,
            :text => text,
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }

        product[:insights].append insight
    end
end