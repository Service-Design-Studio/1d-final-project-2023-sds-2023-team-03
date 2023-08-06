module InsightsConfig
    @@severity = {
        -1 => "N/A",
        0 => "Exceptional",
        1 => "Positive",
        2 => "Moderate",
        3 => "Severe",
        4 => "Critical"
    }

    @@product_insights = [
        :apply_sales_change,
        :apply_declining_seven_days,
        :apply_popular
    ]

    @@global_insights = [
        :apply_global_popular_low_stock,
        :apply_global_low_stock,
        :apply_best_category,
        :apply_worst_category,
        :apply_top_bottom_sales,
        :apply_global_declining_seven_days
    ]

    def InsightsConfig.severity
        @@severity
    end

    def InsightsConfig.product_insights
        @@product_insights
    end

    def InsightsConfig.global_insights
        @@global_insights
    end
end