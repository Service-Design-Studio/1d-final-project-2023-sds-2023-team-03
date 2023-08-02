require 'nokogiri'
require 'net/http'
require 'uri'
require 'json'
require 'cgi'
require 'csv'


############### CHANGE SEARCH TERM FOR DIFFERENT CATEGORIES ###############
search_term = 'Running'
###########################################################################


USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edg/80.0.361.69',
  # Add more user agents here
]

page_count = 1
all_products_urls = []
it = 0


def get_url(search_term,it,page_c)
  url_dict = {
    'Running'=> ["https://www.lazada.sg/men-sports-running-shoes/?location=local&page=#{page_c}&service=official","https://www.lazada.sg/women-sport-shoes-running-shoes/?location=local&service=official&page=#{page_c}"],
    'Comfortwear' => ["https://www.lazada.sg/catalog/?location=local&page=#{page_c}&q=Comfort%20Shoes&service=official"], 
    'Nike(M)' => ["https://www.lazada.sg/shop-mens-sneakers/nike/?from=wangpu&location=local&nike&page=#{page_c}&q=Men%27s%20Shoes&service=official"],
    'Nike(W)' => ["https://www.lazada.sg/women-sneakers/nike/?from=wangpu&location=local&nike&page=#{page_c}&q=women%27s%20shoes&service=official"],
    'Adidas(M)' => ["https://www.lazada.sg/adidas/?spm=a2o42.10453684.0.0.39e2e489Fd87X0&q=All-Products&shop_category_ids=669002&from=wangpu&sc=KVUG&page=#{page_c}"],
    'Adidas(W)' => ["https://www.lazada.sg/adidas/?from=wangpu&q=All-Products&sc=KVUG&shop_category_ids=669010&spm=a2o42.10453684.0.0.39e2e489bG47O5&page=#{page_c}"],
    'Skechers(M)' => ["https://www.lazada.sg/men-sports-running-shoes/skechers/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}","https://www.lazada.sg/shop-mens-sport-sneakers/skechers/?skechers&from=wangpu&service=official&location=local&page=#{page_c}"],
    'Skechers(W)' => ["https://www.lazada.sg/shop-womens-sport-sneakers/skechers/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}","https://www.lazada.sg/shop-women-walking-shoes/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}","https://www.lazada.sg/women-sport-shoes-running-shoes/skechers/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}"],
    'U_A(M)' => ["https://www.lazada.sg/men-sports-running-shoes/?from=wangpu&location=local&page=#{page_c}&service=official&under-armour","https://www.lazada.sg/shop-men-fitness-cross-training-shoes/?under-armour&from=wangpu&page=#{page_c}&service=official&location=local"],
    'U_A(W)' => ["https://www.lazada.sg/shop-women-fitness-cross-training-shoes/under-armour/?under-armour&from=wangpu&page=#{page_c}&service=official&location=local","https://www.lazada.sg/women-sport-shoes-running-shoes/under-armour/?from=wangpu&location=local&page=#{page_c}&service=official&under-armour"]
  }

  return url_dict[search_term][it]

end

# "https://shopee.sg/mall/search?facet=11012070%2C11012195&keyword=running%20shoes&noCorrection=true&page=1&sortBy=sales"

# Classic (GET)
def send_request(all_p_urls,page_count,search_term,it)

  puts "page count is #{page_count}"

  url_to_call = "https://shopee.sg/mall/search?facet=11012070%2C11012195&keyword=running%20shoes&noCorrection=true&page=1&sortBy=sales"

  puts "url: #{url_to_call}"

  url = URI.encode_www_form_component(url_to_call)


  js_scenario = <<~JS
  {
    "instructions": [
    {"wait": 5000},
    {"scroll_y": 2250},
    {"wait": 1700},
    {"scroll_y": 2616},
    {"wait": 3232}
    ]}
  JS
  
  uri = URI("https://app.scrapingbee.com/api/v1/?api_key=VNC7VJ04BQLZWL821KJ4ZLG17ON45K4Y56P59QZMDNZBWRFAS0LIK47I3KFH6AMLUXPHIUIFBDOMIOUE&url=#{url}&stealth_proxy=True&country_code=sg&wait_browser=networkidle2&json_response=True&block_resources=False&block_ads=True&js_scenario=" + CGI.escape(js_scenario))

  # Randomly select a user agent
  user_agent = USER_AGENTS.sample

  # Create client
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  # Create Request
  req = Net::HTTP::Get.new(uri)

  # Set headers to mimic browser behavior
  req['User-Agent'] = user_agent
  req['Accept-Language'] = 'en-US,en;q=0.9'
  req['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'

  # Fetch Request
  res = http.request(req)
  puts "Response HTTP Status Code: #{res.code}"
  # puts "Response HTTP Response Body: #{res.body}"

  puts '--------------------- Parsing! ---------------------'


  # Assuming you have JSON data in bytes format
  json_data = res.body

  # Decode the bytes data into a string
  json_string = json_data.force_encoding('utf-8')

  # Parse the JSON string
  data = JSON.parse(json_string)

  # body_data = data['resolved-url']
  puts 'resolved-url'
  puts data['resolved-url']


  body_data = data['body']

  # Print body_data keys
  puts '----------------------------------'
  puts 'BODY'
  puts '----------------------------------'
  puts body_data


  puts '--------------------- Extracting! ---------------------'




rescue StandardError => e
  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 20 seconds..."
  sleep(20)

end




send_request(all_products_urls,page_count,search_term,it)
