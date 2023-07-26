# app/controllers/api/v1/scraper_controller.rb

module Api
    module V1
      class ScraperController < ApplicationController
        def fetch_all_products
          products = BigQueryModule.fetch_all_products
          render json: products
        end
  
        def fetch_products_by_category
          category = params[:category]
          products = BigQueryModule.fetch_products_by_category(category)
          render json: products
        end
  
        def fetch_products_by_brand
          brand_name = params[:brand]
          products = BigQueryModule.fetch_products_by_brand(brand_name)
          render json: products
        end
  
        def fetch_products_by_date
          date = Date.parse(params[:date])
          products = BigQueryModule.fetch_products_by_date(date)
          render json: products
        end
  
        def sort_by_quantity_sold
          products = BigQueryModule.sort_by_quantity_sold
          render json: products
        end

        def detect_anomalies
            contamination = params[:contamination].to_f
    
            # Call the detect_anomalies method from BigQueryModule
            anomalies = BigQueryModule.detect_anomalies(contamination)
    
            render json: anomalies
        end
      end
    end
  end
  