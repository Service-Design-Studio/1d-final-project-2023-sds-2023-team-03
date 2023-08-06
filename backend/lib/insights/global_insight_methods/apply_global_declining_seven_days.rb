module GlobalInsights
    def GlobalInsights.apply_global_declining_seven_days(**input_hash)
        insights_hash = input_hash[:insights]

        qty = 0
        insights_hash.each do |product|
            if product["insights"].any?{|insight| insight[:name] == :declining_seven_days}
                qty += 1
            end
        end

        if (qty == 0)
            return nil
        end

        if (qty > 0 && qty <= 10)
            grade = InsightsConfig.severity[3]
        elsif (qty > 10)
            grade = InsightsConfig.severity[4]
        end

        insight = {
            :name => :global_declining_seven_days,
            :text => "#{qty} products have been declining in sales in the past 7 days.",
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }
    end
end
