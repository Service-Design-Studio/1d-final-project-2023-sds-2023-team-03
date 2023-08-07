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
            "content": "This prompt is for category classification.

            input: Product Name: adidas Lifestyle adidas Originals x Moomin Baseball Cap Kids White IB9256
            Product Description: Through their many adventures over the decades, Finnish fairytale characters the Moomins have brought warm and fuzzy feelings to people across the globe. This kids\' adidas x Moomin baseball cap is infused with that Scandinavian lovability and a sense of adventure thanks to a colourful print featuring Snorkmaiden threading wildflowers in her hair. The adjustable back closure lets them get the fit just right.

            Our cotton products support more sustainable cotton farming.
            - 100% cotton twill
            - Adjustable back closure
            - Moomin graphic
            - 100% Cotton
            output: Comfortwear

            input: Product Name: Skechers Online Exclusive Women We Bare Bears SKECHERS Street V\'Lites Shoes - 896063-BKMT Air-Cooled Memory Foam
            Product Description: Description:



            Embark on an exciting journey with the We Bare Bears as they set on an adventure to fit into the human society. Channel your love for the bears in the Skechers Women We Bare Bears SKECHERS Street V\'Lites Shoes. Smooth synthetic and mesh fabric upper in a slip on fashion sneaker with stitching and overlay detail. Air Cooled Memory Foam insole.



            Features:

            - Contrast colored stitching accents

            - Heel overlay with pull on top fabric loop

            - Embroidered side S logo

            - Soft fabric shoe lining

            - Air Cooled Memory Foam insole

            - Flexible traction outsole

            - Skechers® logo details
            output: Comfortwear

            input: Product Name: Under Armour UA Men\'s Streaker Run Singlet
            Product Description: UNDER ARMOUR MAKES YOU FEEL BETTER
            Longer distances and faster runs start with incredible comfort, perfect stretch, and a lightweight feel. That\'s what you get with UA Streaker. It basically feels like you\'re wearing nothing.
            Product DNA:
            -UA Microthread fabric dries fast, won\'t cling, stretches without absorbing sweat & is recyclable
            -Material wicks sweat & dries really fast
            -Anti-odor technology prevents the growth of odor-causing microbes
            -Mesh panels for added ventilation
            -Reflective details for low-light runs
            -Style #: 1361468
            -Body: 93% Polyester/7% Elastarell
            -Mesh: 96% Polyester/4% Elastarell
            -Imported
            -Wash garment inside out
            -Machine wash cold with like colors
            -Use only non-chlorine bleach when needed
            -Tumble dry low
            -Do not iron
            -Do not use softeners
            -Do not dry clean
            -Material code : 1361468-001
            -Fit Type : Fitted
            -Gender : Men
            -Division : Apparel
            -Type : Tops
            -RUNNING -STREAKER
            -Season : CO
            output: Running

            input: Product Name: Nike Women\'s Quest 4 Running Shoes - Black
            Product Description: Nike Women\'s Quest 4 Running Shoes - Black

            MINIMAL AND LIGHTWEIGHT, MADE FOR SPEED.

            The pursuit of speed continues with the Nike Quest 4. Higher foam heights and cushioned comfort combine with a lightweight upper that offers secure support. Intuitive details make it a staple for the everyday runner.

            Visible, Secure Support

            The lightweight and minimal upper features a breathable mesh at the forefoot. A translucent window showcases Flywire technology through the midfoot. The Flywire cables work with the laces to provide more midfoot support as you tighten them.

            Lifted Stacks, Plush Feel

            A textured foam midsole helps add durability where you need it and looks fast. Its increased heights add softer cushioning with every step.

            Made For the Long Run

            A rubber outsole delivers increased traction. A ride rail on the lateral outsole acts as a cushioning device, while a crash pad enhances durability in this high-wear zone.

            Supportive Comfort

            Soft foam in the heel provides comfort and support on your runs.

            Numbered Details

            The mesh-lined tongue is connected to the upper\'s inner lining for a secure feel. An alphanumeric logo at the tongue spells out Nike Quest.
            output: Running

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
  end
end