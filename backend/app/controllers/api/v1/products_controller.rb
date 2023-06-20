module Api
  module V1
    class ProductsController < ApplicationController
      def index
        products = Product.all

        render json: ProductSerializer.new(products).serialized_json
      end

      def show
        slugified_product_category = params[:product_category].parameterize
        products = Product.where("lower(product_category) = ?", slugified_product_category)

        render json: ProductSerializer.new(products).serialized_json
      end
    end
  end
end
