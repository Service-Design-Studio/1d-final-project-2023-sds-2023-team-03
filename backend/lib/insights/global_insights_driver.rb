Dir[File.join(__dir__, 'global_insight_methods/*.rb')].each {|file| require file}
require_relative './insights_config.rb'

module GlobalInsights
    def GlobalInsights.get_insights(input_hash)
        insight_labels = InsightsConfig.global_insights

        # input_hash contains 3 things:
        # :products => Product model relation
        # :sales => Sale model relation
        # :insights => hash all product insights generated assigned to a product_id as the key

        insights = []
        insight_labels.each {|insight| insights.append(send(insight, input_hash))}

        return insights
    end
end