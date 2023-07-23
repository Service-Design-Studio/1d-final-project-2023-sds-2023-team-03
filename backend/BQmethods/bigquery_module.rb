# lib/bigquery_module.rb

module BigQueryModule
    require "google/cloud/bigquery"
  
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
  
    def self.create_table
      project_id = "sds-group3"
      dataset_id = "ecommerce_data" # Replace with your dataset ID
      table_id = "product_sales"    # Replace with your desired table ID
  
      bigquery = Google::Cloud::Bigquery.new(project: project_id)
      dataset = bigquery.dataset(dataset_id)
  
      table = dataset.create_table(table_id) do |schema|
        schema.string "product_name"
        schema.integer "units_sold"
        # Add more fields as needed based on your data
      end
  
      if table
        puts "Table #{table.table_id} created."
      else
        puts "Table creation failed."
      end
    end
  end
  