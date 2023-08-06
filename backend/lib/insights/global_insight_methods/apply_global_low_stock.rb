module GlobalInsights
    def GlobalInsights.apply_global_low_stock(input_hash)
        products = input_hash[:products]
        consider_restock = products.where('stock < units_sold')

        qty_restock = consider_restock.length

        grade = InsightsConfig.severity[0]
        if (qty_restock > 0 && qty_restock <= 10)
            grade = InsightsConfig.severity[3]
        elsif (qty_restock > 10)
            grade = InsightsConfig.severity[4]
        end

        insight = {
            :name => :global_low_stock,
            :text => "There are #{qty_restock} products you may want to consider restocking.",
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }

        return insight
    end
end