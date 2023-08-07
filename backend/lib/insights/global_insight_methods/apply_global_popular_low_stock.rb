module GlobalInsights
    def GlobalInsights.apply_global_popular_low_stock(**input_hash)
        insights_hash = input_hash[:insights]

        qty = 0
        insights_hash.each do |product|
            if product["insights"].any?{|insight| insight[:name] == :popular_low_stock}
                qty += 1
            end
        end

        grade = InsightsConfig.severity[0]
        if (qty > 0 && qty <= 5)
            grade = InsightsConfig.severity[3]
        elsif (qty > 5)
            grade = InsightsConfig.severity[4]
        end

        insight = {
            :name => :global_selling_fast_low_stock,
            :text => "You have #{qty} products that have been popular in the last month that have low stock!",
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }
    end
end