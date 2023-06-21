module Api
  module V1
    class ProductsController < ApplicationController
      def index
        # Access category, start_date, and end_date parameters from request URL
        category = params[:category].parameterize if params[:category]
        start_date = params[:start]
        end_date = params[:end]

        products = Product.all
        products = products.where("lower(product_category) = ?", category) if category
        products = products.where(date: start_date..end_date) if start_date && end_date

        render json: ProductSerializer.new(products).serialized_json
      end

      # def show
      #   slugified_product_category = params[:product_category].parameterize
      #   products = Product.where("lower(product_category) = ?", slugified_product_category)

      #   render json: ProductSerializer.new(products).serialized_json
      # end
    end
  end
end
