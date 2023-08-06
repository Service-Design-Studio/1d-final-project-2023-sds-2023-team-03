require "google/cloud/bigquery"

def configure_bigquery_client
  project_id = "sds-group3"
  bigquery = Google::Cloud::Bigquery.new(project: project_id)
end
