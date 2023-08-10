require 'json'
require './lib/insights/product_insights_driver.rb'
require './lib/insights/global_insights_driver.rb'

module Api
    module V1
        class InsightsController < ApplicationController
            @@available_types = [
                :products
            ]

            def available_types
                @@available_types
            end

            def index
                out = "Available categories: "
                available_types.each do |type|
                    if (available_types.find_index(type) == available_types.length-1)
                        out += "#{type}."
                    else
                        out += "#{type},"
                    end
                end
                render :body => out, :json => {:available => available_types.to_json}
            end

            def show
                if !params.has_key?(:id) 
                    return
                end
                
                type = params[:id].downcase
                if (respond_to?(type))
                    send(type) and return
                end

                render :body => "Insights do not exist for category \"#{type}\"!", 
                :status => 404
            end

            def products
                sales = Sale.all
                products = Product.all.as_json

                render :json => ProductInsights.get_insights(products, sales)
            end

            def global
                sales_live = Sale.all
                products_live = Product.all
                products = products_live.as_json
                product_insights = ProductInsights.get_insights(products, sales_live)

                input_params = {
                    :products => products_live,
                    :sales => sales_live,
                    :insights => product_insights.map {|product| {
                        "product_id" => product["product_id"],
                        "insights" => product[:insights]
                    }}
                }

                render :json => GlobalInsights.get_insights(input_params)
            end
        end
    end
end
