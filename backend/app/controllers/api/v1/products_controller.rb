require 'json'

module Api
  module V1
    class ProductsController < ApplicationController
      def index
        if params.has_key?(:category) || params.has_key?(:low)
          query and return
        end

        out = Product.all
        render :json => out
      end

      def query
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
        id = params[:id]
        out = Product.find(id)

        render :json => out
      end

      def create
        new_product = Product.create!(product_params)
        render :json => new_product
      end

      def delete
        id = params[:id]
        to_delete = Product.find(id)
        to_delete.destroy!

        flash[:notice] = "Product \"#{to_delete.product_name}\" successfully deleted from the Product database."
      end
    end
  end
end