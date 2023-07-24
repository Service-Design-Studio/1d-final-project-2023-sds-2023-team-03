require "google/cloud/bigquery"

# Your Google Cloud project ID
project_id = "sds-group3"

# Your dataset ID and table ID where you want to load the data
dataset_id = "ecommerce_data"
table_id = "product_sales"

# Create a BigQuery client
bigquery = Google::Cloud::Bigquery.new(project: project_id)

# Get the dataset reference
dataset_ref = bigquery.dataset(dataset_id)

# Get the table reference
table_ref = dataset_ref.table(table_id)

# Define the schema of the table (adjust the field names and data types as needed)
schema = [
  { name: "brand", type: "STRING" },
  { name: "product_name", type: "STRING" },
  { name: "product_price", type: "STRING" },
  { name: "qty_sold_per_month", type: "INTEGER" },
  { name: "image_url", type: "STRING" }
]

# Create the table if it doesn't exist
unless bigquery.table(table_ref)
  bigquery.create_table(dataset_id, table_id, schema: schema)
  puts "Table #{table_id} created."
end

# Load the data into the table
rows = final_list.map do |product_data|
  {
    brand: product_data[0],
    product_name: product_data[1],
    product_price: product_data[2].to_f, # Assuming product_price is a string, convert it to float
    qty_sold_per_month: product_data[3].to_i, # Assuming qty_sold_per_month is a string, convert it to integer
    image_url: product_data[4]
  }
end

insert_response = bigquery.insert(table_ref, rows)

# Check if the insert was successful
if insert_response.success?
  puts "Data loaded into BigQuery table #{table_id} successfully."
else
  puts "Error loading data into BigQuery table: #{insert_response.error}"
end
