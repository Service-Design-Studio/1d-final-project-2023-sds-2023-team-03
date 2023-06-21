require 'json'

module Api
  module V1
    class ProductsController < ApplicationController
      def index
        # Access category, start_date, and end_date parameters from request URL
        category = params[:category].parameterize if params[:category]
        start_date = params[:start]
        end_date = params[:end]
        
        frequencies = Product.sales_frequency(start_date, end_date, category)
        render json: frequencies.to_json
      end
    end
  end
end
