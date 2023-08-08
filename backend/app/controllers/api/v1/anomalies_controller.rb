module Api
  module V1
    class AnomaliesController < ApplicationController

      require 'google/cloud/bigquery'
      require 'google/cloud/storage'
      require_relative '../../../../lib/bigquery_module.rb'

      def load_data_into_bigquery
        # Fetch products from database
        products = Product.all

        # Convert products to newline-delimited JSON format
        ndjson_data = products_to_ndjson(products)

        # Step 1: Upload to Google Cloud Storage
        storage = Google::Cloud::Storage.new
        bucket = storage.bucket "puma-products"
        file = bucket.create_file StringIO.new(ndjson_data), "product_data.ndjson"

        # Step 2: Load data from GCS to BigQuery
        bigquery = Google::Cloud::Bigquery.new
        dataset = bigquery.dataset "ecommerce_data"
        table = dataset.table "product_data"

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

      def detect_anomalies
        contamination = params[:contamination].to_f

        # Call the detect_anomalies method from BigQueryModule
        products = BigQueryModule.detect_anomalies(contamination)

        render json: products
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
