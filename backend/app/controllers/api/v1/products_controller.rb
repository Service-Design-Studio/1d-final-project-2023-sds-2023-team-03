require 'json'

module Api
  module V1
    class ProductsController < ApplicationController
      def index
        # Access category, start_date, and end_date parameters from request URL
        category = params[:category].parameterize if params[:category]
        start_date = params[:start]
        end_date = params[:end]
        
        products = Product.category_time_query(start_date, end_date, category)
        frequencies = Product.sales_frequency(products)
        revenues = Product.sales_revenue(products)
        types = Product.top_10_types_category(products)
        out = {
          :frequencies => frequencies,
          :revenues => revenues,
          :types => types
        }
        render json: out.to_json
      end
    end
  end
end
