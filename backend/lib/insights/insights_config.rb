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
        :apply_selling_fast
    ]

    @@global_insights = [

    ]

    def InsightsConfig.severity
        @@severity
    end

    def InsightsConfig.product_insights
        @@product_insights
    end

    def InsightConfig.global_insights
        @@global_insights
    end
end