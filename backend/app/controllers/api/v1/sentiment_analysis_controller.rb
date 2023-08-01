module Api
  module V1
    class SentimentAnalysisController < ApplicationController
      include VertexAiHelper

      skip_before_action :verify_authenticity_token, only: [:analyze_sentiment]
    
      def analyze_sentiment
        text = params[:text]
    
        response = perform_vertex_ai_request(text)
    
        if response
          # Process the response, e.g., extract sentiment, score, etc., and display it on the website
          sentiment = response['predictions'].first['content']
          # Other processing based on the API response...
        else
          # Handle API error or failed response
          # Display an error message to the user, etc.
          sentiment = nil
        end
        render json: { sentiment: sentiment}
      end
    end
  end
end