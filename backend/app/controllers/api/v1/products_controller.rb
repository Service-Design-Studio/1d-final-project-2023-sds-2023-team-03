require 'json'

module Api
  module V1
    class ProductsController < ApplicationController
      def index
        # Initialize output as a blank object
        out = {}

        # Access query parameters

        # If low=true
        if params[:low] == "true"
          out = Product.bottom_four
        end

        # If category specified
        if params[:category]
          category = params[:category]
          if out.length > 0
            out = Product.filter_category(out, category)
          else
            out = Product.search_category(category)
          end
        end

        render :json => out
      end

      def show
        out = Product.all

        render :json => out
      end
    end
  end
end