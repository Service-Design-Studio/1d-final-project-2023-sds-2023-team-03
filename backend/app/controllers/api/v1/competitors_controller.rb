require 'json'

module Api
  module V1
    class CompetitorsController < ApplicationController
       def index
        # Query to get data for a specific competitor
        competitor = Competitor.where(competitor_name: params[:id])
        # Query to get top 5 sales for the specific competitor
        top_sales = competitor.order(sales: :desc).limit(5)

        # Query to get the highest selling product's data
        highest_selling_product = competitor.order(sales: :desc).first

        render json: { top_sales: top_sales, all_data: competitor, highest_selling_product: highest_selling_product }
      end

      def create
        competitor = Competitor.create!(competitor_params)
        render json: CompetitorSerializer.new(competitor).to_json
      end

      def show
        competitor = Competitor.find(params[:product_id])
        render json: { status: 'SUCCESS', message: 'Loaded competitor product', data: competitor }
      end

      def update
        competitor = Competitor.find(params[:product_id])

        begin
          competitor.update!(competitor_params)
          render json: { status: 'SUCCESS', message: 'Updated competitor product', data: competitor }
        rescue ActiveRecord::RecordInvalid
          render json: { status: 'ERROR', message: 'Competitor product not updated', data: competitor.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        competitor = Competitor.find params[:product_id]
        competitor.destroy
        flash[:notice] = "Competitor Product '#{competitor.product_name}' entry deleted."
      end

      def all
        competitors = Competitor.all
        render :json => competitors
      end

      private
      def competitor_params
        params.require(:competitor).permit(:competitor_name, :product_id, :product_category, :product_type, :product_name, :price, :stock, :sales, :date)
      end
    end
  end
end
