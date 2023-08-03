# lib/tasks/bigquery.rake

#For Windows (Command Prompt):
# set GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\keyfile.json"

# For Windows (PowerShell):
# $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\keyfile.json"

# For macOS or Linux:
# export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"


require_relative '../bigquery_module.rb'
require_relative '../../db/bq_seeds.rb' # Require the file with seeded data

namespace :bigquery do
  desc "Create BigQuery dataset"
  task create_dataset: :environment do
    BigQueryModule.create_dataset
  end

  desc "Create BigQuery table"
  task create_table: :environment do
    BigQueryModule.create_table
  end

  desc "Load data into BigQuery table"
  task load_data: :environment do
    data = final_list # Call the method from the included module
    BigQueryModule.load_data_into_table(data) # Use the method from the module to load data into BigQuery
  end

  # Define additional tasks if needed
end
