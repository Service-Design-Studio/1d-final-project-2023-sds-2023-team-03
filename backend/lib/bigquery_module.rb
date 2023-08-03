# lib/bigquery_module.rb

require "google/cloud/bigquery"
require 'date'
#Remember to update project_id, dataset_id, table_id accordingly!!!

module BigQueryModule
  def self.create_dataset
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.create_dataset(dataset_id)

    if dataset
      puts "Dataset #{dataset.dataset_id} created."
    else
      puts "Dataset creation failed."
    end
  end

  def self.product_details_schema
    [
      { name: "category", type: "STRING" },
      { name: "brand", type: "STRING" },
      { name: "product_name", type: "STRING" },
      { name: "initial_price", type: "STRING" },
      { name: "discounted_price", type: "STRING" },
      { name: "quantity_sold", type: "INTEGER" },
      { name: "product_url", type: "STRING" },
      { name: "image_url", type: "STRING" },
      { name: "date_api_called", type: "DATE" }
    ]
  end

  def self.create_table
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID
    table_id = "running_category" # Replace with your desired table ID

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)

    table = dataset.create_table(table_id) do |schema|
      product_details_schema.each do |field|
        schema.send(field[:type].downcase, field[:name])
      end
    end

    if table
      puts "Table #{table.table_id} created with schema: #{table.schema.fields}"
    else
      puts "Table creation failed."
    end
  end

  def self.load_data_into_table(data)
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID
    table_id = "running_category" # Replace with your desired table ID

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)

    rows = data.map do |entry|
      {
        category: entry[0],
        brand: entry[1],
        product_name: entry[2],
        initial_price: entry[3],
        discounted_price: entry[4],
        quantity_sold: entry[5].to_i,
        product_url:entry[6],
        image_url: entry[7],
        date_api_called: Date.parse(entry[8])
      }
    end

    response = table.insert(rows)

    if response.success?
      puts "Data successfully loaded into BigQuery."
    else
      puts "Data loading failed: #{response.error}"
    end
  end

  def self.fetch_all_products
    # Configure Google Cloud BigQuery client
    bigquery = Google::Cloud::Bigquery.new(project: "sds-group3")

    # Specify your dataset and table IDs
    dataset_id = "ecommerce_data"
    table_id = "running_category"

    # Construct the query to fetch all products
    query = "SELECT * FROM `#{dataset_id}.#{table_id}`"

    # Execute the query and get the results
    job = bigquery.query_job(query)
    results = job.data

    # Process the results and return the data as an array of hashes
    # Assuming the column names in your table match the keys in the hash
    products = results.map do |row|
      {
        category: row["category"],
        brand: row["brand"],
        product_name: row["product_name"],
        initial_price: row["initial_price"],
        discounted_price: row["discounted_price"],
        quantity_sold: row["quantity_sold"],
        product_url: row["product_url"],
        image_url: row["image_url"],
        date_api_called: row["date_api_called"]
      }
    end

    products
  end

  def self.fetch_products_by_category(category)
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID
    table_id = "running_category" # Replace with your desired table ID

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)

    # Construct the query to fetch products filtered by category
    query = <<~SQL
      SELECT *
      FROM `#{project_id}.#{dataset_id}.#{table_id}`
      WHERE category = "#{category}"
    SQL

    job = bigquery.query_job(query)
    results = job.wait_until_done!

    # Process the results and return an array of hashes representing products filtered by category
    if results.failed?
      puts "Error: #{results.error}"
      return []
    else
      products = []
      results.each do |row|
        products << {
          category: row[:category],
          brand: row[:brand],
          product_name: row[:product_name],
          initial_price: row[:initial_price],
          discounted_price: row[:discounted_price],
          quantity_sold: row[:quantity_sold],
          product_url: row[:product_url],
          image_url: row[:image_url],
          date_api_called: row[:date_api_called]
        }
      end
      return products
    end
  end

  def self.fetch_products_by_brand(brand_name)
    # Configure Google Cloud BigQuery client
    bigquery = Google::Cloud::Bigquery.new(project: "sds-group3")
  
    # Specify your dataset and table IDs
    dataset_id = "ecommerce_data"
    table_id = "running_category"
  
    # Construct the query to fetch products by brand
    query = "SELECT * FROM `#{dataset_id}.#{table_id}` WHERE brand = '#{brand_name}'"
  
    # Execute the query and get the results
    job = bigquery.query_job(query)
    results = job.data
  
    # Process the results and return the data as an array of hashes
    # Assuming the column names in your table match the keys in the hash
    products = results.map do |row|
      {
        category: row["category"],
        brand: row["brand"],
        product_name: row["product_name"],
        initial_price: row["initial_price"],
        discounted_price: row["discounted_price"],
        quantity_sold: row["quantity_sold"],
        product_url: row["product_url"],
        image_url: row["image_url"],
        date_api_called: row["date_api_called"]
      }
    end
    products
  end

  def self.fetch_products_by_date(date)
    # Configure Google Cloud BigQuery client
    bigquery = Google::Cloud::Bigquery.new(project: "sds-group3")
  
    # Specify your dataset and table IDs
    dataset_id = "ecommerce_data"
    table_id = "running_category"
  
    # Format the date in YYYY-MM-DD format
    formatted_date = date.strftime("%Y-%m-%d")
  
    # Construct the query to fetch products by date
    query = "SELECT * FROM `#{dataset_id}.#{table_id}` WHERE DATE(date_api_called) = '#{formatted_date}'"
  
    # Execute the query and get the results
    job = bigquery.query_job(query)
    results = job.data
  
    # Process the results and return the data as an array of hashes
    # Assuming the column names in your table match the keys in the hash
    products = results.map do |row|
      {
        category: row["category"],
        brand: row["brand"],
        product_name: row["product_name"],
        initial_price: row["initial_price"],
        discounted_price: row["discounted_price"],
        quantity_sold: row["quantity_sold"],
        product_url: row["product_url"],
        image_url: row["image_url"],
        date_api_called: row["date_api_called"]
      }
    end
    products
  end
  
  def self.sort_by_quantity_sold
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID
    table_id = "running_category" # Replace with your desired table ID

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)

    # Construct the query to fetch products sorted by quantity_sold in descending order
    query = <<~SQL
      SELECT *
      FROM `#{project_id}.#{dataset_id}.#{table_id}`
      ORDER BY quantity_sold DESC
    SQL

    job = bigquery.query_job(query)
    results = job.wait_until_done!

    # Process the results and return an array of hashes representing products sorted by quantity_sold
    products = []
    results.each do |row|
      products << {
        category: row[:category],
        brand: row[:brand],
        product_name: row[:product_name],
        initial_price: row[:initial_price],
        discounted_price: row[:discounted_price],
        quantity_sold: row[:quantity_sold],
        product_url: row[:product_url],
        image_url: row[:image_url],
        date_api_called: row[:date_api_called]
      }
    end
    products
  end

  def self.train_kmeans_model(num_clusters)
    project_id = "sds-group3"
    dataset_id = "ecommerce_data"
    table_id = "running_category"

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)

    model_name = "my_kmeans_model"
    model_query = <<~SQL
      CREATE MODEL `#{project_id}.#{dataset_id}.#{model_name}`
      OPTIONS(
        MODEL_TYPE = 'kmeans',
        NUM_CLUSTERS = #{num_clusters},
        KMEANS_INIT_METHOD = 'kmeans++'
      ) AS
      SELECT quantity_sold 
      FROM `#{project_id}.#{dataset_id}.#{table_id}`
    SQL

    job = bigquery.query_job(model_query)
    job.wait_until_done!

    if job.done?
      puts "K-means model '#{model_name}' trained successfully with #{num_clusters} clusters."
    else
      puts "Error while training the K-means model."
    end
  end

  def self.detect_anomalies(contamination)
    project_id = "sds-group3"
    dataset_id = "ecommerce_data"
    model_name = "my_kmeans_model"
  
    # Initialize the BigQuery client
    bigquery = Google::Cloud::Bigquery.new(project: project_id)
  
    # 1. Run the anomaly detection and store the results in a temporary table
    create_temp_anomalies_table(bigquery, contamination, project_id, dataset_id, model_name)
  
    # 2. Calculate the mean and standard deviation of quantity_sold and store the results in a separate table
    calculate_quantity_stats(bigquery, project_id, dataset_id)
  
    # 3. Join the anomalies with the statistics and classify each anomaly based on its quantity_sold value
    products = join_anomalies_with_stats(bigquery, project_id, dataset_id)
  
    products
  end
  
  def self.create_temp_anomalies_table(bigquery, contamination, project_id, dataset_id, model_name)
    query = <<~SQL
      CREATE OR REPLACE TABLE `#{project_id}.#{dataset_id}.temp_anomalies` AS
      SELECT
        *
      FROM
        ML.DETECT_ANOMALIES(MODEL `#{dataset_id}.#{model_name}`,
                            STRUCT(#{contamination} AS contamination),
                            TABLE `#{project_id}.#{dataset_id}.running_category`)
    SQL
    bigquery.query_job(query)
  end
  
  def self.calculate_quantity_stats(bigquery, project_id, dataset_id)
    query = <<~SQL
      CREATE OR REPLACE TABLE `#{project_id}.#{dataset_id}.quantity_stats` AS
      SELECT
        AVG(quantity_sold) as mean_quantity,
        STDDEV(quantity_sold) as stddev_quantity
      FROM
        `#{project_id}.#{dataset_id}.running_category`
    SQL
    bigquery.query_job(query)
  end
  
  def self.join_anomalies_with_stats(bigquery, project_id, dataset_id)
    query = <<~SQL
      SELECT
        anomalies.*,
        quantity_stats.mean_quantity,
        CASE
          WHEN anomalies.is_anomaly = TRUE THEN
            CASE
              WHEN anomalies.quantity_sold > quantity_stats.mean_quantity THEN 'High'
              ELSE 'Low'
            END 
          ELSE 'Not Anomaly'
        END AS anomaly_type
      FROM
        `#{project_id}.#{dataset_id}.temp_anomalies` anomalies,
        `#{project_id}.#{dataset_id}.quantity_stats` quantity_stats
    SQL
  
    # Execute the query and get the results
    job = bigquery.query_job(query)
    results = job.data
  
    # Process the results and return the data as an array of hashes
    products = results.map do |row|
      {
        category: row["category"],
        brand: row["brand"],
        product_name: row["product_name"],
        initial_price: row["initial_price"],
        discounted_price: row["discounted_price"],
        quantity_sold: row["quantity_sold"],
        product_url: row["product_url"],
        image_url: row["image_url"],
        date_api_called: row["date_api_called"],
        is_anomaly: row["is_anomaly"],
        anomaly_type: row["anomaly_type"],
        mean_quantity: row["mean_quantity"]
      }
    end
    products
  end  
end