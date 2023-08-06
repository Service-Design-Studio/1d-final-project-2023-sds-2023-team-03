Dir[File.join(__dir__, 'product_insight_methods/*.rb')].each {|file| require file}
require_relative './insights_config.rb'

module ProductInsights
    def ProductInsights.get_insights(prs, sls)
        products = prs
        insight_labels = InsightConfig.product_insights

        products.each do |product|
            product[:insights] = []
            insight_labels.each { |insight| send(insight, product, sls)}

            if (product[:insights].length > 0)
                product[:insights].sort_by {|e| e[:severity][:level]}
            end
        end

        return products
    end
end