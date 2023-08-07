require "google/cloud/bigquery"
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
      { name: "product_id", type: "INTEGER" },
      { name: "product_category", type: "STRING" },
      { name: "product_type", type: "STRING" },
      { name: "product_name", type: "STRING" },
      { name: "price", type: "FLOAT" },
      { name: "created_at", type: "TIMESTAMP" },
      { name: "updated_at", type: "TIMESTAMP" },
      { name: "stock", type: "INTEGER" },
      { name: "units_sold", type: "INTEGER" },
      { name: "description", type: "STRING" },
      { name: "image_link", type: "STRING" }
    ]
  end

  def self.create_table
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID
    table_id = "product_data" # Replace with your desired table ID

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
    table_id = "product_data" # Replace with your desired table ID
  
    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)
  
    rows = data.map do |entry|
      {
        product_id: entry[0],
        product_category: entry[1],
        product_type: entry[2],
        product_name: entry[3],
        price: entry[4].to_f,
        created_at: entry[5] ? DateTime.parse(entry[5].to_s) : nil,
        updated_at: entry[6] ? DateTime.parse(entry[6].to_s) : nil,
        stock: entry[7].to_i,
        units_sold: entry[8].to_i,
        description: entry[9],
        image_link: entry[10]
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
    table_id = "product_data"

    # Construct the query to fetch all products
    query = "SELECT * FROM `#{dataset_id}.#{table_id}`"

    # Execute the query and get the results
    job = bigquery.query_job(query)
    results = job.data

    # Process the results and return the data as an array of hashes
    # Assuming the column names in your table match the keys in the hash
    products = results.map do |row|
      {
        product_id: entry[0],
        product_category: entry[1],
        product_type: entry[2],
        product_name: entry[3],
        price: entry[4].to_f,
        created_at: entry[5] ? DateTime.parse(entry[5].to_s) : nil,
        updated_at: entry[6] ? DateTime.parse(entry[6].to_s) : nil,
        stock: entry[7].to_i,
        units_sold: entry[8].to_i,
        description: entry[9],
        image_link: entry[10]
      }
    end
    products
  end

  def self.train_kmeans_model(num_clusters)
    project_id = "sds-group3"
    dataset_id = "ecommerce_data"
    table_id = "product_data"
  
    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)
  
    model_name = "my_kmeans_model"
    model_query = <<~SQL
      CREATE OR REPLACE MODEL `#{project_id}.#{dataset_id}.#{model_name}`
      OPTIONS(
        MODEL_TYPE = 'kmeans',
        NUM_CLUSTERS = #{num_clusters},
        KMEANS_INIT_METHOD = 'kmeans++'
      ) AS
      SELECT units_sold
      FROM `#{project_id}.#{dataset_id}.#{table_id}`
    SQL
  
    job = bigquery.query_job(model_query)
    job.wait_until_done!
  
    if job.failed?
      puts "Error training the K-means model: #{job.error}"
    else
      puts "K-means model '#{model_name}' trained successfully with #{num_clusters} clusters."
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
  
    # 2. Calculate the mean and standard deviation of units_sold and store the results in a separate table
    calculate_quantity_stats(bigquery, project_id, dataset_id)
  
    # 3. Join the anomalies with the statistics and classify each anomaly based on its units_sold value
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
                            TABLE `#{project_id}.#{dataset_id}.product_data`)
    SQL
    job = bigquery.query_job(query)
    job.wait_until_done!
  end
  
  def self.calculate_quantity_stats(bigquery, project_id, dataset_id)
    query = <<~SQL
      CREATE OR REPLACE TABLE `#{project_id}.#{dataset_id}.quantity_stats` AS
      SELECT
        AVG(units_sold) as mean_quantity,
        STDDEV(units_sold) as stddev_quantity
      FROM
        `#{project_id}.#{dataset_id}.product_data`
    SQL
    job = bigquery.query_job(query)
    job.wait_until_done!
  end
  
  def self.join_anomalies_with_stats(bigquery, project_id, dataset_id)
    query = <<~SQL
      SELECT
        anomalies.*,
        quantity_stats.mean_quantity,
        CASE
          WHEN anomalies.is_anomaly = TRUE THEN
            CASE
              WHEN anomalies.units_sold > quantity_stats.mean_quantity THEN 'High'
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
    results = job.data.to_a
  
    # Process the results and return the data as an array of hashes
    products = results.map do |row|
      {
        is_anomaly: row[:is_anomaly],
        product_id: row[:product_id],
        product_category: row[:product_category],
        product_type: row[:product_type],
        product_name: row[:product_name],
        price: row[:price].to_f,
        created_at: row[:created_at] ? DateTime.parse(row[:created_at].to_s) : nil,
        updated_at: row[:updated_at] ? DateTime.parse(row[:updated_at].to_s) : nil,
        stock: row[:stock].to_i,
        units_sold: row[:units_sold].to_i,
        description: row[:description],
        image_link: row[:image_link],
        anomaly_type: row[:anomaly_type]
      }
    end
    products
  end  
end