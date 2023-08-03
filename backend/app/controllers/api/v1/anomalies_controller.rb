# app/controllers/api/v1/anomalies_controller.rb

module Api
    module V1
      class AnomaliesController < ApplicationController
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

        def train_kmeans_model
          num_clusters = params[:num_clusters].to_i
  
          # Call the train_kmeans_model method from BigQueryModule
          BigQueryModule.train_kmeans_model(num_clusters)
  
          render json: { message: "K-means model with #{num_clusters} clusters is being trained." }
        end

        def create_temp_anomalies_table
          contamination = params[:contamination].to_f
  
          # Call the create_temp_anomalies_table method from BigQueryModule
          BigQueryModule.create_temp_anomalies_table(contamination)
  
          render json: { message: "Temp anomalies table created with contamination: #{contamination}" }
        end
  
        def create_quantity_stats_table
          # Call the create_quantity_stats_table method from BigQueryModule
          BigQueryModule.create_quantity_stats_table
  
          render json: { message: "Quantity stats table created." }
        end
  
        def join_anomalies_with_stats
          # Call the join_anomalies_with_stats method from BigQueryModule
          anomalies = BigQueryModule.join_anomalies_with_stats
  
          render json: anomalies
        end
      end
    end
  end
  