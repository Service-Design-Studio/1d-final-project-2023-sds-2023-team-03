require 'nokogiri'
require 'net/http'
require 'uri'
require 'json'
require 'cgi'
require 'csv'


############### CHANGE SEARCH TERM FOR DIFFERENT CATEGORIES ###############
search_term = 'U_A(W)'
###########################################################################


USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edg/80.0.361.69',
  # Add more user agents here
]
page_count = 0
all_products_urls = []


# Classic (GET)
def send_request(all_p_urls,page_count,search_term)

  # Input search term

  url_dict = {
    'Running'=> "https://shopee.sg/mall/search?facet=11012070%2C11012195&keyword=running%20shoes&noCorrection=true&page=#{page_count}&sortBy=sales",
    'Comfortwear' => "https://shopee.sg/mall/search?keyword=sneakers&locations=Singapore&noCorrection=true&page=#{page_count}&sortBy=sales",
    'Adidas(M)' => "https://shopee.sg/adidassg?page=#{page_count}&shopCollection=244592522&sortBy=sales",
    'Adidas(W)' => "https://shopee.sg/adidassg?page=#{page_count}&shopCollection=244349361&sortBy=sales",
    'Skechers(M)' => "https://shopee.sg/skecherssg?page=#{page_count}&shopCollection=244289712&sortBy=sales",
    'Skechers(W)' => "https://shopee.sg/skecherssg?page=#{page_count}&shopCollection=244289273&sortBy=sales",
    'U_A(M)' => "https://shopee.sg/under_armour_official?page=#{page_count}&shopCollection=102499998&sortBy=sales",
    'U_A(W)' => "https://shopee.sg/under_armour_official?page=#{page_count}&shopCollection=102500265&sortBy=sales"
  }

  puts "page count is #{page_count+1}"


  puts url_dict[search_term]

  url = URI.encode_www_form_component(url_dict[search_term])

  js_scenario = <<~JS
  {
    "instructions": [
    {"wait": 5000},
    {"scroll_y": 3000},
    {"wait": 2300},
    {"scroll_y": 2250},
    {"wait": 1700},
    {"scroll_y": 1000},
    {"wait": 2000},
    {"scroll_y": 2000},
    {"wait": 2053},
    {"scroll_y": 3000},
    {"wait": 2735},
    {"scroll_y": 2000},
    {"wait": 1956},
    {"scroll_y": 3000},
    {"wait": 10232}
    ]}
  JS
  
  # Response_iteration = Response_iteration + 1

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


  puts '--------------------- Extracting! ---------------------'


  # Parse the HTML data
  soup = Nokogiri::HTML(body_data)

  #Set containers
  if search_term == 'Comfortwear' || search_term == 'Running'
    puts 'Scraping by Categories...'
    soup_container = soup.at_css('div.row\\ shopee-search-item-result__items')

    puts 'getting links, locations and qty sold/mth'
    link = soup_container.css('a > @href')

    location = soup_container.css("div.zGGwiV")
    sold = soup_container.css("div.r6HknA")
    final_link =[]

    puts "location: #{location}"
    puts "sold :#{sold}"

    link_data = link.map(&:text)

    sold_data_raw = sold.map(&:text)
    location_data = location.map(&:text)
  else
    puts 'Scraping by Brands...'
    soup_container = soup.at_css('div.shop\\-search\\-result\\-view')

    puts 'getting links, locations and qty sold'
    link = soup_container.css('a > @href')
    sold = soup_container.css("div.sPnnFI")
    final_link =[]

    link_data = link.map(&:text)

    sold_data_raw = sold.map(&:text)
    location_data = Array.new(link_data.length, 'SG')
  end


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


  link_data.each do |data|
    final_link << "https://shopee.sg" + data
  end


  puts "len of urls: #{final_link.length}"

  puts "len of locations: #{location_data.length}"

  puts "len of sold_data: #{sold_data.length}"

  # puts "len of img_urls: #{img_data.length}"

  
  # zipped_list = final_link.zip(location_data,sold_data,img_data) ## w img
  zipped_list = final_link.zip(location_data,sold_data)
  zipped_list.each do |url_location_entry| 
    all_p_urls << url_location_entry
  end

  
  page_bool = soup.at_css("div.shopee-mini-page-controller")

  # puts page_bool
  if page_bool.to_s.include?("shopee-button-outline shopee-mini-page-controller__next-btn shopee-button-outline--disabled")
    puts 'next page does not exist, terminating'
    return
  else 
    puts 'moving to next page...'
  end
  puts '-------------------------------------------------------------------------------'

  page_count += 1


  send_request(all_p_urls,page_count,search_term)

rescue NoMethodError => e
  if e.message.include?("undefined method `css' for nil:NilClass")
    puts "HTTP Request succeeded, but the required element was not found in the HTML."
    puts "Retrying in 20 seconds..."
    sleep(20)
    send_request(all_p_urls, page_count, search_term)
  else
    puts "HTTP Request failed (#{e.message})"
  end
rescue EOFError => e
  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 20 seconds..."
  sleep(20)
  send_request(all_p_urls, page_count, search_term)
rescue StandardError => e
  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 20 seconds..."
  sleep(20)
  send_request(all_p_urls, page_count, search_term)
end

send_request(all_products_urls,page_count,search_term)

puts "len of all listings_data: #{all_products_urls.length}"
# puts "All urls n loc: #{all_products_urls}"


###cleans out non-sg merchants
all_products_urls.reject! do |url_loc|
  !url_loc[1].include?('SG') ||
  !['Shoes', 'shoes', 'shoe', 'Shoe'].any? { |substring| url_loc[0].include?(substring) }
end


puts "len of all listings_data(cleaned): #{all_products_urls.length}"


##################################################################
## ENTERING INTO EACH URL
##################################################################

puts "............................................"
puts "............................................"
puts 'ENTERING INTO URLS'
puts "............................................"
puts "............................................"

Brand_dict = {
  'adidassg' => "Adidas",
  'asicsofficial'=> "Asics",
  'skecherssg'=> "Skechers",
  'skechersglobal.sg'=> "Skechers",
  'under_armour_official'=> "Under Armour",
  'puma_singapore'=> "Puma",
}

Impt_brands = ['adidassg','asicsofficial','skecherssg','under_armour_official','puma_singapore']

final_list = []
error_urls = []

if search_term == 'Running'
  prod_label = 'Running'
elsif search_term == 'Comfortwear'
  prod_label = 'Comfortwear'
else 
  prod_label = 'NIL'
end


def send_request_url(final_l,prod_listing,cat_label,retry_number)


  if retry_number == 5
    puts 'Product cannot be scraped (Max retries of 5 has been reached)'
    puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>next product>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    return
  end

  puts "url: #{prod_listing[0]}"

  url = URI.encode_www_form_component(prod_listing[0])

  js_scenario = <<~JS
  {
    "instructions": [
    {"wait": 5386},
    {"scroll_y": 2544}
    ]}
  JS
  
  # Response_iteration = Response_iteration + 1

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

  # body_data = data['resolved-url']
  puts 'resolved-url'
  puts data['resolved-url']
  # puts data['body']

  body_data = data['body']

  puts '--------------------- Extracting! ---------------------'

  # Parse the HTML data
  soupy = Nokogiri::HTML(body_data)

  soup = soupy.at_css('div.flex-auto.flex-column.swTqJe')



  soupz = soupy.at_css('div.oAVg4E')

  competitor_name = soupz.at_css('div.VlDReK')

  prod_voucher = soup.css('div.voucher\\-ticket\\ voucher\\-ticket\\-\\-SG\\ voucher\\-ticket\\-\\-seller\\-mini\\-solid\\ mini\\-voucher\\-with\\-popover')

  # product_qty = soup.at_css('div.e9sAa2')

  product_name = soup.at_css('div._44qnta')
  
  product_initial_price = soup.at_css('div.Y3DvsN')

  product_final_price = soup.at_css('div.pqTWkA')

  img_perlisting = soupy.at_css("div.cxDtMn")
  product_img = img_perlisting.css("div > @style")

  competitor_name_data = competitor_name.text

  puts "compet name data: #{competitor_name_data}"

  unless Impt_brands.include?(competitor_name_data)
    puts 'Product is not sold by official seller! Skipping...'
    puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>next product>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    return
  end

  if prod_voucher.nil? || prod_voucher.text.empty?
    product_voucher_data = 'NA'
  elsif prod_voucher.map(&:text).length == 1
    product_voucher_data = prod_voucher.text
  else
    product_voucher_data = prod_voucher.map(&:text)
    product_voucher_data = product_voucher_data.join(", ")
  end


  # product_qty_data = product_qty.text
  product_name_data = product_name.text
  product_final_price_data = product_final_price.text
  # product_voucher_data = prod_voucher.nil? || prod_voucher.text.empty? ? 'NA' : prod_voucher.text
  product_initial_price_data = product_initial_price.nil? || product_initial_price.text.empty? ? 'No Price Reduction' : product_initial_price.text
  product_img_data = product_img.to_s
  product_img_data_f = product_img_data.match(/url\(["']([^"']+)["']\)/)[1]
  

  puts "Competitor name: #{Brand_dict.fetch(competitor_name_data)}"

  puts "Product Name: #{product_name_data}"

  puts "Product Vouchers: #{product_voucher_data}"

  puts "Initial Price: #{product_initial_price_data}"

  puts "Final Price: #{product_final_price_data}"
  
  puts "Qty sold per month: #{prod_listing[2]}"

  puts "Product URL: #{prod_listing[0]}"

  puts "Image Url: #{product_img_data_f}"
  
  final_entry = []
  final_entry << cat_label
  final_entry << Brand_dict.fetch(competitor_name_data)
  final_entry << product_name_data
  final_entry << product_voucher_data
  final_entry << product_initial_price_data
  final_entry << product_final_price_data
  final_entry << prod_listing[2].to_i ### sold data
  final_entry << prod_listing[0] ## product url
  final_entry << product_img_data_f



  final_l << final_entry
  puts "final_entry: #{final_entry}"

  puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>next product>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'

rescue NoMethodError => e
  # Handle the error when 'at_css' method fails due to nil value
  puts "Retrying product URL: #{prod_listing[0]} - Error: #{e.message}"
  retry_number = retry_number + 1

  send_request_url(final_l,prod_listing,cat_label,retry_number)
rescue StandardError => e
  puts "HTTP Request failed (#{e.message}), retrying URL"
  retry_number = retry_number + 1

  send_request_url(final_l,prod_listing,cat_label,retry_number)
end


all_products_urls.each do |entry|
  retry_no = 0
  puts "PRODUCT NUMBER: #{all_products_urls.index(entry)+1} out of #{all_products_urls.length}"
  send_request_url(final_list,entry,prod_label,retry_no)
end

puts '---------------------------------------------------------'
puts '---------------------------------------------------------'
puts 'Combined Scraped Data'
puts '---------------------------------------------------------'
puts '---------------------------------------------------------'
puts "Length of products: #{final_list.length}"
puts '---------------------------------------------------------'


current_time = Time.now
date_str = current_time.strftime('%d-%m-%Y') # Format the date as YYYY-MM-DD
time_str = current_time.strftime('%M_%H') # Format the time as HH-MM-SS

csv_filename = "./data/shopee_#{search_term}_product_list_#{date_str}_#{time_str}.csv"

CSV.open(csv_filename, 'w') do |csv|
  final_list.each do |row|
    row << date_str
    csv << row
  end
end

puts "CSV file '#{csv_filename}' created successfully."