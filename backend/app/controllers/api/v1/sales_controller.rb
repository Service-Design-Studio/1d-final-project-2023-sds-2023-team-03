require 'json'

module Api
  module V1
    class SalesController < ApplicationController
      def index
        # Access category, start_date, and end_date parameters from request URL
        category = params[:category].parameterize if params[:category]
        start_date = params[:start]
        end_date = params[:end]

        sales = Sale.category_time_query(start_date, end_date, category)
        frequencies = Sale.sales_frequency(sales)
        revenues = Sale.sales_revenue(sales)
        types = Sale.top_10_types_category(sales)
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
