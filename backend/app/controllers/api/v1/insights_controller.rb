require 'json'
require './lib/insights/product_insights_driver.rb'

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

                render :body => "Insights for category \"#{type}\" do not exist!", 
                :status => 404
            end

            def products
                sales = Sale.all
                products = Product.all.as_json

                render :json => ProductInsights.get_insights(products, sales)
            end
        end
    end
end
