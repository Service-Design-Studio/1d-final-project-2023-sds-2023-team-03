require 'nokogiri'
require 'net/http'
require 'uri'
require 'json'
require 'cgi'
require 'csv'


############### CHANGE SEARCH TERM FOR DIFFERENT CATEGORIES ###############
search_term = 'U_A(M)'
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


Url_len = {
  'Running'=> 2,
  'Comfortwear' => 2, 
  'Nike(M)' => 1,
  'Nike(W)' => 1,
  'Adidas(M)' => 1,
  'Adidas(W)' => 1,
  'Skechers(M)' => 2,
  'Skechers(W)' => 3,
  'U_A(M)' => 2,
  'U_A(W)' => 2
}



def get_url(s_term,its,page_c)
  url_dict = {
    'Running'=> ["https://www.lazada.sg/men-sports-running-shoes/?location=local&page=#{page_c}&service=official","https://www.lazada.sg/women-sport-shoes-running-shoes/?location=local&service=official&page=#{page_c}"],
    'Comfortwear' => ["https://www.lazada.sg/shop-mens-sneakers/?location=local&page=#{page_c}&service=official","https://www.lazada.sg/women-sneakers/?location=local&page=#{page_c}&service=official"],
    'Nike(M)' => ["https://www.lazada.sg/shop-mens-sneakers/nike/?from=wangpu&location=local&nike&q=Men%27s%20Shoes&service=official&page=#{page_c}"],
    'Nike(W)' => ["https://www.lazada.sg/women-sneakers/nike/?from=wangpu&location=local&nike&page=#{page_c}&q=women%27s%20shoes&service=official"],
    'Adidas(M)' => ["https://www.lazada.sg/adidas/?spm=a2o42.10453684.0.0.39e2e489Fd87X0&q=All-Products&shop_category_ids=669002&from=wangpu&sc=KVUG&page=#{page_c}"],
    'Adidas(W)' => ["https://www.lazada.sg/adidas/?from=wangpu&q=All-Products&sc=KVUG&shop_category_ids=669010&spm=a2o42.10453684.0.0.39e2e489bG47O5&page=#{page_c}"],
    'Skechers(M)' => ["https://www.lazada.sg/men-sports-running-shoes/skechers/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}","https://www.lazada.sg/shop-mens-sport-sneakers/skechers/?skechers&from=wangpu&service=official&location=local&page=#{page_c}"],
    'Skechers(W)' => ["https://www.lazada.sg/shop-womens-sport-sneakers/skechers/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}","https://www.lazada.sg/shop-women-walking-shoes/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}","https://www.lazada.sg/women-sport-shoes-running-shoes/skechers/?skechers&from=wangpu&q=All-Products&service=official&location=local&page=#{page_c}"],
    'U_A(M)' => ["https://www.lazada.sg/men-sports-running-shoes/?from=wangpu&location=local&page=#{page_c}&service=official&under-armour","https://www.lazada.sg/shop-men-fitness-cross-training-shoes/?under-armour&from=wangpu&page=#{page_c}&service=official&location=local"],
    'U_A(W)' => ["https://www.lazada.sg/shop-women-fitness-cross-training-shoes/under-armour/?under-armour&from=wangpu&page=#{page_c}&service=official&location=local","https://www.lazada.sg/women-sport-shoes-running-shoes/under-armour/?from=wangpu&location=local&page=#{page_c}&service=official&under-armour"]
  }

  return url_dict[s_term][its]

end

# Classic (GET)
def send_request(all_p_urls,page_count,search_term,it)

  puts "page count is #{page_count}"

  url_to_call = get_url(search_term,it,page_count).to_s

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
  

  uri = URI("https://app.scrapingbee.com/api/v1/?api_key=VNC7VJ04BQLZWL821KJ4ZLG17ON45K4Y56P59QZMDNZBWRFAS0LIK47I3KFH6AMLUXPHIUIFBDOMIOUE&url=#{url}&stealth_proxy=True&country_code=sg&wait_browser=load&json_response=True&block_resources=False&block_ads=True&js_scenario=" + CGI.escape(js_scenario))

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
  # puts body_data


  puts '--------------------- Extracting! ---------------------'


  # Parse the HTML data
  soup = Nokogiri::HTML(body_data)

  #Set containers
  if search_term == 'Comfortwear' || search_term == 'Running'
    puts 'Scraping by Categories...'
    soup_container = soup.at_css('div._17mcb')
    link_container = soup.css('div._95X4G')

    puts 'getting links, qty sold/mth'
    
    link = link_container.css('a > @href')
    sold_checker = soup_container.css("div._6uN7R")
    link_data = link.map(&:text)
    sold_checker_data = sold_checker.map(&:text)

  else
    puts 'Scraping by Brands...'

    soup_container = soup.at_css('div._17mcb')
    link_container = soup.css('div._95X4G')

    puts 'getting links, qty sold/mth'
    
    link = link_container.css('a > @href')
    sold_checker = soup_container.css("div._6uN7R")
    link_data = link.map(&:text)
    sold_checker_data = sold_checker.map(&:text)

  end

  sold_data = []
  final_link = []

  # puts "This is sold_checker_data: #{sold_checker_data}"

  sold_checker_data.each do |cleaned|
    if cleaned == ''
      sold_data << 0
    else
      sold_data << cleaned.split(' ').first.to_i
    end
  end

  link_data.each do |data|
    final_link << "https:" + data
  end

  # puts "Pre-append: #{final_link}"

  puts "len of urls: #{final_link.length}"

  puts "len of sold_data: #{sold_data.length}"


  zipped_list = final_link.zip(sold_data)
  zipped_list.each do |url_location_entry| 
    all_p_urls << url_location_entry
  end
  
  page_bool = soup.at_css("li.ant\\-pagination\\-next")

  # puts page_bool
  if page_bool.to_s.include?("aria-disabled=\"true\"") || page_count == 5

    puts 'next page does not exist, terminating'
    if it == Url_len[search_term]-1
      ### checks if the last url is reached, if is, break loop
      return
    else
      ###moves to next element url
      it += 1
      page_count = 1
      puts "Moving to next URL in category..."
      send_request(all_p_urls,page_count,search_term,it)
    end

    return

  else 
    puts 'moving to next page...'
  end
  puts '-------------------------------------------------------------------------------'

  page_count += 1

  send_request(all_p_urls,page_count,search_term,it)

rescue NoMethodError => e
  if e.message.include?("undefined method `css' for nil:NilClass")
    puts "HTTP Request succeeded, but the required element was not found in the HTML."
    puts "Retrying in 10 seconds..."
    sleep(10)
    send_request(all_p_urls, page_count,search_term,it)
  else
    puts "HTTP Request failed (#{e.message}), retrying..."
    puts "Retrying in 10 seconds..."
    sleep(10)
    send_request(all_p_urls, page_count,search_term,it)
  end
rescue EOFError => e
  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 10 seconds..."
  sleep(10)
  send_request(all_p_urls, page_count,search_term,it)
rescue StandardError => e
  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 10 seconds..."
  sleep(10)
  send_request(all_p_urls, page_count,search_term,it)
end




send_request(all_products_urls,page_count,search_term,it)



# puts "all product details: #{all_products_urls}"



puts "len of all listings_data: #{all_products_urls.length}"



###cleans out non shoes
all_products_urls.reject! do |url_loc|
  !['Shoes', 'shoes', 'shoe', 'Shoe','slides','Slides','slippers','Slippers','Sandals','sandals','boots','Boots'].any? { |substring| url_loc[0].include?(substring) }
end


puts "len of all listings_data(cleaned): #{all_products_urls.length}"


#################################################################
# ENTERING INTO EACH URL
#################################################################

# tester = [["https://www.lazada.sg/products/new-balance-mens-fresh-foam-680v7-standard-blacktop-i2682939601.html?spm=a2o42.searchlistcategory.list.69.47d53f88JcW2FL",243],["https://www.lazada.sg/products/puma-enzo-sport-mens-running-shoes-i1869393761.html?spm=a2o42.searchlistcategory.list.25.47d53f88JcW2FL",13],["https://www.lazada.sg/products/nike-mens-free-rn-2018-running-shoes-black-i2487387310-s14905351679.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253A%253Bnid%253A2487387310%253Bsrc%253ALazadaMainSrp%253Brn%253Ac2fc8f00df62668da58b77a6005a7f6f%253Bregion%253Asg%253Bsku%253A2487387310_SGAMZ%253Bprice%253A165%253Bclient%253Adesktop%253Bsupplier_id%253A1139637285%253Bpromotion_biz%253A%253Basc_category_id%253A4847%253Bitem_id%253A2487387310%253Bsku_id%253A14905351679%253Bshop_id%253A1078457&fastshipping=0&freeshipping=1&fs_ab=2&fuse_fs=1&lang=en&location=Singapore&price=165&priceCompare=&ratingscore=5.0&request_id=c2fc8f00df62668da58b77a6005a7f6f&review=29&sale=200&search=1&source=search&spm=a2o42.searchlistcategory.list.i40.6b493f88IPaWak&stock=1",1424]]

puts "............................................"
puts "............................................"
puts 'ENTERING INTO URLS'
puts "............................................"
puts "............................................"

Brand_dict = {
  'adidassg' => "Adidas",
  'asicsofficial'=> "Asics",
  'ASICS'=> 'Asics',
  'skecherssg'=> "Skechers",
  'skechersglobal.sg'=> "Skechers",
  'sauconyofficial'=> "Saucony",
  'under_armour_official'=> "Under Armour",
  'Under Armour' => 'Under Armour',
  'puma_singapore'=> "Puma",
  'PUMA' => 'Puma',
  'salomon.sg'=> "Salomon",
  'Skechers' => 'Skechers',
  'adidas' => "Adidas",
  'Nike'=>'Nike'
}

Impt_brands = ['adidassg','asicsofficial','skecherssg','sauconyofficial',
              'under_armour_official','puma_singapore','salomon.sg', "ASICS",
              'PUMA','Skechers','adidas','Nike','Under Armour','skecherssg'
              ]

final_list = []
# error_urls = []

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

  puts prod_listing[0]

  url = URI.encode_www_form_component(prod_listing[0])

  js_scenario = <<~JS
  {
    "instructions": [
    {"scroll_y": 2544},
    {"wait": 3000}
    ]
  }
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

  body_data = data['body']

  # puts body_data

  puts '--------------------- Extracting! ---------------------'

  # Parse the HTML data
  soupy = Nokogiri::HTML(body_data)

  soup = soupy.at_css('div.pdp\\-block\\ pdp\\-block__product\\-detail')


  soupz = soupy.at_css('div.seller\\-name\\-retail')


  competitor_name = soupz.at_css('div.seller\\-name__detail')

  product_name = soup.at_css('h1.pdp\\-mod\\-product\\-badge\\-title')
  

  product_initial_price = soup.at_css('span.pdp\\-price\\ pdp\\-price_type_deleted\\ pdp\\-price_color_lightgray\\ pdp\\-price_size_xs')


  product_final_price = soup.at_css('span.pdp\\-price\\ pdp\\-price_type_normal\\ pdp\\-price_color_orange\\ pdp\\-price_size_xl')


  img_perlisting = soupy.at_css("div.gallery\\-preview\\-panel__content")


  product_img = img_perlisting.css("img > @src")


  competitor_name_data = competitor_name.text

  puts "compet name data: #{competitor_name_data}"

  unless Impt_brands.include?(competitor_name_data)
    puts 'Product is not sold by official seller! Skipping...'
    puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>next product>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    return
  end


  product_name_data = product_name.text

  product_final_price_data = product_final_price.text

  product_initial_price_data = product_initial_price.nil? || product_initial_price.text.empty? ? 'No Price Reduction' : product_initial_price.text
 
  product_img_data = product_img.to_s


  puts "Competitor name: #{Brand_dict.fetch(competitor_name_data)}"

  puts "Product Name: #{product_name_data}"

  puts "Initial Price: #{product_initial_price_data}"

  puts "Final Price: #{product_final_price_data}"
  
  puts "Qty sold total: #{prod_listing[1]} sold total"

  puts "Product URL: #{prod_listing[0]}"

  puts "Image Url: #{product_img_data}"
  
  final_entry = []
  final_entry << cat_label
  final_entry << Brand_dict.fetch(competitor_name_data)
  final_entry << product_name_data
  final_entry << ' '
  final_entry << product_initial_price_data
  final_entry << product_final_price_data
  final_entry << prod_listing[1].to_i ### sold data
  final_entry << prod_listing[0] ## product url
  final_entry << product_img_data


  final_l << final_entry
  puts "final_entry: #{final_entry}"

  puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>next product>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'

rescue NoMethodError => e
  # Handle the error when 'at_css' method fails due to nil value
  retry_number = retry_number + 1
  puts "Error: #{e.message}"
  puts "Retrying product URL(#{retry_number}/5): #{prod_listing[0]}"

  sleep(5)

  send_request_url(final_l,prod_listing,cat_label,retry_number)
rescue StandardError => e
  puts "HTTP Request failed (#{e.message})"
  retry_number = retry_number + 1
  puts "Retrying product URL(#{retry_number}/5)..."

  sleep(5)

  send_request_url(final_l,prod_listing,cat_label,retry_number)
end



##############
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

csv_filename = "./data/lazada_#{search_term}_product_list_#{date_str}_#{time_str}.csv"

CSV.open(csv_filename, 'w') do |csv|
  final_list.each do |row|
    row << date_str
    csv << row
  end
end

puts "CSV file '#{csv_filename}' created successfully."