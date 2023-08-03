require 'json'

module Api
  module V1
    class SalesController < ApplicationController
      def index
        if params.has_key?(:category) || params.has_key?(:start) || params.has_key?(:end)
          query and return
        end

        all_sales = Sale.all
        render :json => all_sales
      end

      def query
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

      def show
        sale = Sale.find(params[:id])
        render json: { status: 'SUCCESS', message: 'Loaded sale', data: sale }
      end

      def update
        sale = Sale.find(params[:id])

        begin
          sale.update!(sale_params)
          render json: { status: 'SUCCESS', message: 'Updated sale', data: sale }
        rescue ActiveRecord::RecordInvalid
          render json: { status: 'ERROR', message: 'Sale not updated', data: sale.errors }, status: :unprocessable_entity
        end
      end

      def create
        sale = Sale.create!(sale_params)
        render json: SalesSerializer.new(sale).to_json
      end

      def destroy
        sale = Sale.find params[:id]
        sale.destroy
        flash[:notice] = "Product '#{sale.product_name}' deleted from Sales record."
      end

      def top_categories
        start_date = params[:start]
        end_date = params[:end]
        out = Sale.top_categories_date(start_date, end_date)

        render :json => out
      end

      private
      def sale_params
        params.require(:sale).permit(:product_id, :product_category, :product_type, :product_name, :date, :price, :sales)
      end
    end
  end
end