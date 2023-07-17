require 'nokogiri'
require 'net/http'
require 'uri'
require 'json'
require 'cgi'


USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edg/80.0.361.69',
  # Add more user agents here
]


Url_dict = {
  'Running'=> 'https://shopee.sg/mall/search?facet=11012070%2C11012195&keyword=running%20shoes&noCorrection=true&page=0&sortBy=sales',
  'Running(M)' => 'https://shopee.sg/mall/search?facet=11012070&keyword=running%20shoes&noCorrection=true&page=0&sortBy=sales',
  'Running(W)' => 'https://shopee.sg/mall/search?facet=11012195&keyword=running%20shoes&noCorrection=true&page=0&sortBy=sales',
  'Comfortwear' => 'https://shopee.sg/mall/search?complementKeyword=comfortwear%20shoes&facet=11012800%2C11012747&keyword=shoe&originalResultType=4&page=0&sortBy=sales',
  'Comfortwear(M)' => 'https://shopee.sg/mall/search?complementKeyword=comfortwear%20shoes&facet=11012800&keyword=shoe&originalResultType=4&page=0&sortBy=sales',
  'Comfortwear(W)' => 'https://shopee.sg/mall/search?complementKeyword=comfortwear%20shoes&facet=11012747&keyword=shoe&originalResultType=4&page=0&sortBy=sales',
  'Adidas(M)' => 'https://shopee.sg/adidassg?page=0&shopCollection=244592522&sortBy=sales',
  'Adidas(W)' => 'https://shopee.sg/adidassg?page=0&shopCollection=244349361&sortBy=sales',
  'Skechers(M)' => 'https://shopee.sg/skecherssg?page=0&shopCollection=244289712&sortBy=sales',
  'Skechers(W)' => 'https://shopee.sg/skecherssg?page=0&shopCollection=244289273&sortBy=sales',
  'U_A(M)' => 'https://shopee.sg/under_armour_official?page=0&shopCollection=102499998&sortBy=sales',
  'U_A(W)' => 'https://shopee.sg/under_armour_official?page=0&shopCollection=102500265&sortBy=sales'
}

## Class tags dictionary

Name_dict = {
  'Running' => 'ie3A\\+n\\ bM\\+7UW\\ Cve6sh',
  'Running(M)' => 'ie3A\\+n\\ bM\\+7UW\\ Cve6sh',
  'Running(W)' => 'ie3A\\+n\\ bM\\+7UW\\ Cve6sh',
  'Comfortwear' => 'ie3A\\+n\\ bM\\+7UW\\ Cve6sh',
  'Comfortwear(M)' => 'ie3A\\+n\\ bM\\+7UW\\ Cve6sh',
  'Comfortwear(W)' => 'ie3A\\+n\\ bM\\+7UW\\ Cve6sh',
  'Adidas(M)' => 'h0HBrE\\ ckHqor\\ _5Kkvx1',
  'Adidas(W)' => 'h0HBrE\\ ckHqor\\ _5Kkvx1',
  'Skechers(M)' => 'h0HBrE\\ ckHqor\\ _5Kkvx1',
  'Skechers(W)' => 'h0HBrE\\ ckHqor\\ _5Kkvx1',
  'U_A(M)' => 'h0HBrE\\ ckHqor\\ _5Kkvx1',
  'U_A(W)' => 'h0HBrE\\ ckHqor\\ _5Kkvx1'
              
}

Price_dict = {
  'Running' => 'vioxXd\\ rVLWG6',
  'Running(M)' => 'vioxXd\\ rVLWG6',
  'Running(W)' => 'vioxXd\\ rVLWG6',
  'Comfortwear' => 'vioxXd\\ rVLWG6',
  'Comfortwear(M)' => 'vioxXd\\ rVLWG6',
  'Comfortwear(W)' => 'vioxXd\\ rVLWG6',
  'Adidas(M)' => 'zSpiUB\\ Fd5u2V',
  'Adidas(W)' => 'zSpiUB\\ Fd5u2V',
  'Skechers(M)' => 'zSpiUB\\ Fd5u2V',
  'Skechers(W)' => 'zSpiUB\\ Fd5u2V',
  'U_A(M)' => 'zSpiUB\\ Fd5u2V',
  'U_A(W)' => 'zSpiUB\\ Fd5u2V'
}

Sold_dict = {
  'Running' => 'r6HknA',
  'Running(M)' => 'r6HknA',
  'Running(W)' => 'r6HknA',
  'Comfortwear' => 'r6HknA',
  'Comfortwear(M)' => 'r6HknA',
  'Comfortwear(W)' => 'r6HknA',
  'Adidas(M)' => 'sPnnFI',
  'Adidas(W)' => 'sPnnFI',
  'Skechers(M)' => 'sPnnFI',
  'Skechers(W)' => 'sPnnFI',
  'U_A(M)' => 'sPnnFI',
  'U_A(W)' => 'sPnnFI'
}



# Classic (GET)
def send_request

  

  # Input search term

  ############### CHANGE SEARCH TERM FOR DIFFERENT CATEGORIES ###############
  search_term = 'Running'
  ###########################################################################
  
  puts Url_dict[search_term]
  url = URI.encode_www_form_component(Url_dict[search_term])

  js_scenario = <<~JS
        {
          "instructions": [
          {"scroll_y": 3000},
          {"wait": 2000},
          {"scroll_y": 2000},
          {"wait": 2000},
          {"scroll_y": 1000},
          {"wait": 2000},
          {"scroll_y": 2000},
          {"wait": 2000},
          {"scroll_y": 3000},
          {"wait": 2000},
          {"scroll_y": 2000},
          {"wait": 2000},
          {"scroll_y": 3000}
          ]}
  JS

  uri = URI("https://app.scrapingbee.com/api/v1/?api_key=VNC7VJ04BQLZWL821KJ4ZLG17ON45K4Y56P59QZMDNZBWRFAS0LIK47I3KFH6AMLUXPHIUIFBDOMIOUE&url=#{url}&stealth_proxy=True&wait_browser=load&json_response=True&block_resources=True&block_ads=True&js_scenario=" + CGI.escape(js_scenario))

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

  # Add more headers if needed
  # req['Accept-Encoding'] = 'gzip, deflate'

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

  # Get the list of keys
  keys = data.keys

  # Print the list of keys
  puts 'keys:', keys

  body_data = data['body']

  # Print body_data keys
  puts '----------------------------------'
  puts 'BODY'
  puts '----------------------------------'
  puts body_data


  puts '--------------------- Extracting! ---------------------'


  # Parse the HTML data
  soup = Nokogiri::HTML(body_data)

  # Set containers
  if search_term == 'Running(M)' || search_term == 'Running(W)' || search_term == 'Comfortwear(M)' || search_term == 'Comfortwear(W)' || search_term == 'Comfortwear' || search_term == 'Running'
    puts 'Scraping by Categories...'
    soup_container = soup.at_css('div.row\\ shopee-search-item-result__items')
  else
    puts 'Scraping by Brands...'
    soup_container = soup.at_css('div.shop-page_product-list')
  end
  puts Name_dict[search_term]
  puts Sold_dict[search_term]
  puts Price_dict[search_term]


  # names = soup_container.css("div##{Name_dict[search_term]}")

  # sold = soup_container.css("div##{Sold_dict[search_term]}")

  # price = soup_container.css("div##{Price_dict[search_term]}")
  puts 'soupy!!'

  names = soup_container.css("div.ie3A\\+n\\ bM\\+7UW\\ Cve6sh")
  sold = soup_container.css("div.r6HknA")
  price = soup_container.css("div.vioxXd\\ rVLWG6")

  # Extract the data from div elements

  name_data = names.map(&:text)
  sold_data_raw = sold.map(&:text)
  price_data = price.map(&:text)

  sold_data = []

  sold_data_raw.each do |cleaned|
    if cleaned.include?('month')
      sold_data << cleaned.gsub(' sold/month','').to_i
    elsif cleaned != ''
      sold_data << cleaned.gsub(' sold','').to_i
    else
      sold_data << 0
    end
  end

  puts "len of names: #{name_data.length}"
  puts "name data: #{name_data}"

  puts "len of units sold: #{sold_data.length}"
  puts "units sold data: #{sold_data}"

  puts "len of prices: #{price_data.length}"
  puts "prices data: #{price_data}"
  puts 'KNNBCCB'

  fname = name_data.select(&:empty?)
  fsold = sold_data.select { |value| value.zero? }
  fprices = price_data.select(&:empty?)

  puts "any empty names?: #{fname.length}"
  puts "any empty units sold?: #{fsold.length}"
  puts "any empty prices?: #{fprices.length}"



rescue StandardError => e
  puts "HTTP Request failed (#{e.message})"
end

send_request()



