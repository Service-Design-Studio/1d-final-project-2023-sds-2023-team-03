module Api
  module V1
    class AnomaliesController < ApplicationController

      require 'google/cloud/bigquery'
      require 'google/cloud/storage'
      require_relative '../../../../lib/bigquery_module.rb'

      DEFAULT_NUM_CLUSTERS = 5 # Set to your desired default value
      DEFAULT_CONTAMINATION = 0.05 # Set to your desired default value

      def index
        contamination = params[:contamination].to_f

        # Call the detect_anomalies method from BigQueryModule
        products = BigQueryModule.detect_anomalies(contamination)

        render json: products
      end

      def clear_bigquery_table
        bigquery = Google::Cloud::Bigquery.new(project: "sds-group3")
        dataset = bigquery.dataset "ecommerce_data"
        table = dataset.table "product_data"
        table.delete if table
      end


      def bigquery_data
        # Clear the BigQuery table
        clear_bigquery_table

        # Fetch products from database
        products = Product.all

        # Convert products to newline-delimited JSON format
        ndjson_data = products_to_ndjson(products)

        # Step 1: Upload to Google Cloud Storage
        storage = Google::Cloud::Storage.new
        bucket = storage.bucket "puma-products"
        file = bucket.create_file StringIO.new(ndjson_data), "product_data.ndjson"

        # Step 2: Load data from GCS to BigQuery
        bigquery = Google::Cloud::Bigquery.new(project: "sds-group3")
        dataset = bigquery.dataset "ecommerce_data"

        # Retrieve the table or create it if it doesn't exist
        table = dataset.table("product_data") || BigQueryModule.create_table

        # If table is still nil, raise an error
        unless table
          render json: { error: "Failed to retrieve or create BigQuery table." }
          return
        end

        load_job = table.load_job "gs://puma-products/product_data.ndjson", format: "json"
        load_job.wait_until_done!

        # Render success/failure message
        if load_job.failed?
          # Log the errors to the Rails log
          Rails.logger.error("BigQuery Load Job Errors: #{load_job.errors.inspect}")
          render json: { error: load_job.error }
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

      def post_deployment
        # 1. Load data into BigQuery
        response = bigquery_data
        return if performed? # Check if a render or redirect has been performed

        # 2. Train K-means model
        num_clusters = (params[:num_clusters] || DEFAULT_NUM_CLUSTERS).to_i
        BigQueryModule.train_kmeans_model(num_clusters)

        # 3. Detect anomalies
        contamination = (params[:contamination] || DEFAULT_CONTAMINATION).to_f
        anomalies = BigQueryModule.detect_anomalies(contamination)

        # Render the anomalies or any other required response
        render json: anomalies
      end


      private

      def products_to_ndjson(products)
        products.map do |product|
          product.attributes.except("id").to_json
        end.join("\n")
      end
    end
  end
end
