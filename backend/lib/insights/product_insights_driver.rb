Dir[File.join(__dir__, 'product_insight_methods/*.rb')].each {|file| require file}

module ProductInsights
    @@severity = {
        -1 => "N/A",
        0 => "Exceptional",
        1 => "Positive",
        2 => "Moderate",
        3 => "Severe",
        4 => "Critical"
    }

    def ProductInsights.severity
        @@severity
    end

    def ProductInsights.get_insights(prs, sls)
        products = prs
        insight_labels = [
            :apply_sales_change
        ]

        products.each do |product|
            product[:insights] = []
            insight_labels.each do |insight|
                send(insight, product, sls)
            end
        end

        return products
    end
end