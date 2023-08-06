module ProductInsights
    def ProductInsights.apply_sales_change(product, sls)
        severity = ProductInsights.severity
        product_id = product[:product_id]
        sale = sls

        sales_yday = sls.where('product_id = ? AND date = ?', product_id, 1.day.ago.to_date)
        sales_today = sls.where('product_id = ? AND date = ?', product_id, Time.current.to_date)

        if (!sales_yday && !sales_today)
            insight = {
                :name => :salesChange,
                :text => "There were no sales for this product yesterday or today.",
                :severity => severity[-1]
            }

            product[:insights].append insight
            return
        end

        sold_yday = 0
        sold_today = 0

        if (sales_yday)
            sales_yday.each do |sale|
                sold_day += sale.sales
            end
        end

        if (sales_today)
            sales_today.each do |sale|
                sold_day += sale.sales
            end
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
            text = "Sales for this product have risen by #{change*100}% since 24 hours ago #{1.day.ago.to_date}."
        elsif change < 0
            text = "Sales for this product have dropped by #{-(change*100)}% since 24 hours ago #{1.day.ago.to_date}."
        else
            text = "Sales for this product have not changed since 24 hours ago #{1.day.ago.to_date}."
        end

        insight = {
            :name => :sales_change,
            :text => text,
            :severity => grade
        }

        product[:insights].append insight
    end
end