require 'json'

module Api
  module V1
    class CompetitorsController < ApplicationController
       def show
        # Query to get data for a specific competitor
        competitor = Competitor.where(competitor_name: params[:id])

        # Query to get top 5 sales for the specific competitor
        top_sales = competitor.order(sales: :desc).limit(5)

        # Query to get the highest selling product's data
        highest_selling_product = competitor.order(sales: :desc).first

        render json: { all_data: competitor, top_sales: top_sales, highest_selling_product: highest_selling_product }
      end

      def all
        # Query to get data for all competitors
        all_competitors = Competitor.all

        # Query to get top 5 sales across all competitors
        top_sales = all_competitors.order(sales: :desc).limit(5)

        # Query to get the highest selling product's data
        highest_selling_product = all_competitors.order(sales: :desc).first

        render json: { all_data: all_competitors, top_sales: top_sales, highest_selling_product: highest_selling_product}
      end
    end
  end
end
