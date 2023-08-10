class LazadaData < ApplicationRecord
    include VertexAiHelper

    def update_category_with_ai
        if self.product_description.nil?
            self.update(category: "NIL")
        else
            prod_text = "Product Name: #{self.product_name}\nProduct Description: #{self.product_description}"
            response = perform_vertex_ai_request(prod_text)
            Rails.logger.debug(response)
            puts("response", response)

            if response
                if response.key?('predictions') && response['predictions'].first.key?('content')
                  category = response['predictions'].first['content']
                  self.update(category: category)
                  self.save!
                else
                  Rails.logger.error("Unexpected response format: #{response}")
                end
            else
            # Handle error
            Rails.logger.error("Error occurred during category classification")
            end
        end
    end

end
