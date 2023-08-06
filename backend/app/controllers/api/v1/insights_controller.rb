require 'json'
require './lib/insights/product_insights_driver.rb'

module Api
    module V1
        class InsightsController < ApplicationController

            def index

            end

            def show
                type = params[:id]
                sales = Sale.all
                products = Product.all.as_json

                render :json => ProductInsights.get_insights(products, sales)
            end
        end
    end
end
