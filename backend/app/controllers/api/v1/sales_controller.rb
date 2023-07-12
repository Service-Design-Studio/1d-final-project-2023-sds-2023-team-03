require 'json'

module Api
  module V1
    class SalesController < ApplicationController
      def index
        # set output as empty by default
        out = {}

        # Access category, start_date, and end_date parameters from request URL
        category = params[:category].parameterize if params[:category]
        start_date = params[:start]
        end_date = params[:end]

        if params[:category]
        end

        if params[:start] && params[:end]
        end

        if params[:category] && params[:start] && params[:end]
          sales = Sale.category_time_query(start_date, end_date, category)
          frequencies = Sale.sales_frequency(sales)
          revenues = Sale.sales_revenue(sales)
          types = Sale.top_10_types_category(sales)
          out = {
            :frequencies => frequencies,
            :revenues => revenues,
            :types => types
          }
        end
        
        render :json => out
      end
    end
  end
end
