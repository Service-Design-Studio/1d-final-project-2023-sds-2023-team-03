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

      def destroy
        id = params[:id]
        to_delete = Product.find(id)
        to_delete.destroy!

        flash[:notice] = "Product \"#{to_delete.product_name}\" successfully deleted from the Product database."
      end

      def update
        id = params[:id]
        prod = Product.find(id)

        begin
          prod.update!(product_params)
          render json: { status: 'SUCCESS', message: 'Updated product', data: prod }
        rescue ActiveRecord::RecordInvalid
          render json: { status: 'ERROR', message: 'Product not updated', data: prod.errors }, status: :unprocessable_entity
        end
      end

      def update_units_sold
        sales = Sale.all
        products = Product.all
        out = []
        products.each do |product|
          product_sales = sales.where('product_id = ?', product.product_id)
          if (!product_sales)
            next
          end

          qty_sold = 0
          product_sales.each do |sale|
            qty_sold += sale.sales
          end

          out.append ({
            :product => product.product_name,
            :sales => qty_sold
          })
          product.update(units_sold: qty_sold)
        end

        render :json => out
      end

      private
      def product_params
        params.require(:product).permit(:product_id, :product_category, :product_type, :product_name, :price, :stock, :units_sold, :description, :image_link)
      end
    end
  end
end
