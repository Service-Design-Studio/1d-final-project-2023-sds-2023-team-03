#For Windows (Command Prompt):
# set GOOGLE_APPLICATION_CREDENTIALS="../../sds-group3-cafedc04bd19.json"

# For Windows (PowerShell):
# $env:GOOGLE_APPLICATION_CREDENTIALS="../../sds-group3-cafedc04bd19.json"

# For macOS or Linux:
# export GOOGLE_APPLICATION_CREDENTIALS="../../sds-group3-cafedc04bd19.json"

require "google/cloud/bigquery"

# Load BigQuery module and seed data generator
require_relative '../bigquery_module.rb'

namespace :bigquery do
  desc "Create BigQuery dataset"
  task create_dataset: :environment do
    BigQueryModule.create_dataset
  end

  desc "Create BigQuery table"
  task create_table: :environment do
    BigQueryModule.create_table
  end

  desc "Export products to BigQuery"
  task export_products: :environment do
    # Access the data from the products table
    products = Product.all

    # Format the data for BigQuery
    formatted_data = products.map do |product|
      product.attributes
    end

    # Upload to BigQuery
    bigquery = Google::Cloud::Bigquery.new(project: "sds-group3")
    dataset = bigquery.dataset "ecommerce_data"
    table = dataset.table "product_data"

    # Insert rows directly
    table.insert formatted_data
  end

  desc "Train the K-means clustering model"
  task :train_kmeans, [:num_clusters] => :environment do |t, args|
    num_clusters = args.num_clusters.to_i
    if num_clusters < 1
      puts "Please provide a valid number of clusters."
      return
    end
    BigQueryModule.train_kmeans_model(num_clusters)
  end

  desc "Detect anomalies in the data"
  task :detect_anomalies, [:contamination] => :environment do |t, args|
    contamination = args.contamination.to_f
    if contamination <= 0 || contamination >= 1
      puts "Please provide a valid contamination value between 0 and 1."
      return
    end

    anomalies = BigQueryModule.detect_anomalies(contamination)
    
    # Print out the anomalies
    puts anomalies
  end
end