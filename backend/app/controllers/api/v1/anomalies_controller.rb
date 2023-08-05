module Api
  module V1
    class AnomaliesController < ApplicationController

      require 'google/cloud/bigquery'

      def load_data_into_bigquery
        # Fetch products
        products = Product.all

        # Convert products to newline-delimited JSON format
        ndjson_data = products_to_ndjson(products)

        # Set up BigQuery client
        bigquery = Google::Cloud::Bigquery.new
        dataset = bigquery.dataset "ecommerce_data" # replace with your dataset ID
        table = dataset.table "product_data" # replace with your table name

        # Load data
        load_job = table.load_job ndjson_data, format: "json"
        load_job.wait_until_done! 

        # Render success/failure message
        if load_job.failed?
          render json: { error: load_job.error.message }
        else
          render json: { message: "Data loaded successfully into BigQuery" }
        end
      end

      # Added the fetch_products action
      def fetch_products
        products = Product.all
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

      private

      def products_to_ndjson(products)
        products.map(&:to_json).join("\n")
      end
    end
  end
end
