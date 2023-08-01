require 'net/http'
require 'json'
require 'googleauth'

module VertexAiHelper
  def perform_vertex_ai_request(text)
    api_endpoint = "us-central1-aiplatform.googleapis.com"
    project_id = "puma-ecommerce-tool-390510"
    model_id = "text-bison@001"

    url = "https://#{api_endpoint}/v1/projects/#{project_id}/locations/us-central1/publishers/google/models/#{model_id}:predict"
    uri = URI(url)

    service_account_key_path = Rails.root.join('config', 'serviceaccountkey.json')
    creds = Google::Auth::ServiceAccountCredentials.make_creds(json_key_io: File.open(service_account_key_path), scope: 'https://www.googleapis.com/auth/cloud-platform')
    creds.fetch_access_token!

    headers = {
      'Authorization' => "Bearer #{creds.access_token}",
      'Content-Type' => 'application/json'
    }

    data = {
      "instances": [
        {
          "content": "This prompt is for sentiment analysis.

          input: Product A has 50% less sales than Product B.
          output: Critical
          
          input: Product A has 50% more sales than Product C.
          output: Very Good
          
          input: #{text}
          output:
          "
        }
      ],
      "parameters": {
        "temperature": 0.2,
        "maxOutputTokens": 256,
        "topP": 0.8,
        "topK": 40
      }
    }

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, headers)
    request.body = data.to_json

    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
      return JSON.parse(response.body)
    else
      # Handle error response here
      return nil
    end
    #return "Good"
  end
end
