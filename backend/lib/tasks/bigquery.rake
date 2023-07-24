# lib/tasks/bigquery.rake

require_relative '../../BQmethods/bigquery_module.rb'

namespace :bigquery do
  desc "Create BigQuery dataset"
  task create_dataset: :environment do
    BigQueryModule.create_dataset
  end

  desc "Create BigQuery table"
  task create_table: :environment do
    BigQueryModule.create_table
  end

  # Define additional tasks if needed
end
