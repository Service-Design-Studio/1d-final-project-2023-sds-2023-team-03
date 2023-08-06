module GlobalInsights
    def GlobalInsights.apply_worst_category(**input_hash)
        category_data = Sale.top_categories_date(30.days.ago.to_date, Time.now.to_date)
        revenues = category_data[:amount]
        units_labels = category_data[:units].keys
        units_values = category_data[:units].values

        amount = revenues[units_labels.first].floor
        grade = InsightsConfig.severity[-1]
        insight = {
            :name => :worst_category,
            :text => "Your worst-performing category is #{units_labels.first} with #{units_values.first} units sold, generating a total of S$#{amount} in revenue.",
            :severity => {
                :label => grade,
                :level => InsightsConfig.severity.key(grade)
            }
        }
    end
end