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

        render json: { top_sales: top_sales, all_data: competitor, highest_selling_product: highest_selling_product }
      end
    end
  end
end
