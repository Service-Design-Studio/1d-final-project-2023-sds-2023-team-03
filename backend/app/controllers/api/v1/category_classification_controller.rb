module Api
    module V1
      class CategoryClassificationController < ApplicationController
        # include VertexAiHelper
  
        # skip_before_action :verify_authenticity_token, only: [:classify_category]
      
        # def classify_category
        #   text = params[:text]
      
        #   response = perform_vertex_ai_request(text)
      
        #   if response
        #     category = response['predictions'].first['content']
        #   else
        #     # Handle API error or failed response
        #     # Display an error message to the user, etc.
        #     category = nil
        #   end
        #   render json: { category: category }
        # end
      end
    end
  end