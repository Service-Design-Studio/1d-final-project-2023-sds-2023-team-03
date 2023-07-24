# lib/bigquery_module.rb

require "google/cloud/bigquery"

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
      { name: "brand", type: "STRING" },
      { name: "product_name", type: "STRING" },
      { name: "product_price", type: "STRING" },
      { name: "quantity_sold", type: "INTEGER" },
      { name: "image_url", type: "STRING" }
    ]
  end

  def self.create_table
    project_id = "sds-group3"
    dataset_id = "ecommerce_data" # Replace with your desired dataset ID
    table_id = "shopee_products" # Replace with your desired table ID
  
    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
  
    table = dataset.create_table(table_id) do |schema|
      product_details_schema.each do |field|
        schema.field(name: field[:name], type: field[:type])
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
    table_id = "shopee_products" # Replace with your desired table ID

    bigquery = Google::Cloud::Bigquery.new(project: project_id)
    dataset = bigquery.dataset(dataset_id)
    table = dataset.table(table_id)

    rows = data.map do |entry|
      {
        brand: entry[0],
        product_name: entry[1],
        product_price: entry[2],
        quantity_sold: entry[3].to_i,
        image_url: entry[4]
      }
    end

    response = table.insert(rows)

    if response.success?
      puts "Data successfully loaded into BigQuery."
    else
      puts "Data loading failed: #{response.error}"
    end
  end
end
