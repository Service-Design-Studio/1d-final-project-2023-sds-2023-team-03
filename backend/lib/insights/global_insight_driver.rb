Dir[File.join(__dir__, 'global_insight_methods/*.rb')].each {|file| require file}

module GlobalInsights
    def GlobalInsights.get_insights(prs, sls)
        insight_labels = InsightsConfig.global_insights

        insights = []
        insight_labels.each {|insight| insights.append(send(insight, prs, sls))}

        return insights
    end
end