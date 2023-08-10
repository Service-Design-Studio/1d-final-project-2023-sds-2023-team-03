require 'nokogiri'
require 'net/http'
require 'uri'
require 'json'
require 'cgi'
require 'csv'

## rotate mimic-ing of headless browser
USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edg/80.0.361.69',
]

error_urls = []

##  input keywords
keywords = [
  'sneakers',
  'shoes',
  'sandals',
  'flip%20flops',
  'sneakers%20shoes',
  'sports%20shoes',
  'football%20boots',
  'hiking%20shoes',
  'basketball%20shoes',
  'futsal%20shoes',
  'mules',
  'running%20shoes',
  'white%20shoes',
  'sandals%20for%20men',
  'shoes%20for%20men',
  'slippers',
  'flat%20shoes',
  'football%20shoes',
  'sandals%20for%20women',
  'wedges%20shoes',
  'shoes%20for%20women',
  'best%20running%20shoes',
  'slip%20on%20shoes',
  'sneakers%20for%20women',
  'white%20sneakers',
  'canvas%20shoes',
  'casual%20shoe',
  'casual%20shoes%20for%20men',
  'sports%20shoes%20for%20women',
  'platform%20shoes',
  'running%20shoes%20for%20men',
  'sneakers%20for%20men',
  'tennis%20shoes',
  'training%20shoes',
  'ankle%20boots',
  'ballerina%20shoes',
  'black%20shoes',
  'hiking%20shoes%20for%20women',
  'offwhite%20shoes',
  'running%20shoes%20for%20women',
  'shoes%20for%20girls',
  'slippers%20for%20men',
  'trail%20running%20shoes',
  'flat%20shoes%20for%20women',
  'hiking%20sandals',
  'sports%20shoes%20for%20men',
  'white%20shoes%20for%20men',
  'white%20sneakers%20for%20men',
  'jogging%20shoes',
  'walking%20shoes',
  'best%20hiking%20shoes',
  'best%20walking%20shoes',
  'black%20sneakers',
  'hiking%20boots',
  'slip%20on%20shoes%20for%20men',
  'suede%20shoes',
  'velcro%20shoes',
  'walking%20shoes%20for%20women'
]



## Def request fn
def send_request(all_p_urls,page_count,url_keywords,actual,retry_count,error_urls)

  # all_p_urls --> append results to this list every time a request is called
  # page_count --> intuitive
  # url_keywords --> iterates through each keyword(e.g sneakers%20shoes)
  # actual --> iterates through each keyword, replacing %20 with _ (e.g sneakers_shoes)
  # retry_count --> count number of retries, breaks if max is reached
  # error_urls --> append URLS that could not be scraped (max 5 retries) to this list

  # Base URL
  scrape_link = "https://shopee.sg/mall/search?&keyword=#{url_keywords}&locations=Singapore&noCorrection=true&page=#{page_count}&sortBy=relevancy"

  puts "Scraping page #{page_count+1} of #{actual} search term."

  url = URI.encode_www_form_component(scrape_link)

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
    {"scroll_y": 3000}
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


  puts '--------------------- Extracting! ---------------------'

  # Parse the HTML data
  soup = Nokogiri::HTML(body_data)


  puts "Starting keyword scrape for page #{page_count+1} of #{actual}"

  soup_container = soup.at_css('div.row\\ shopee-search-item-result__items')
  img_container1 = soup_container.css('div.yvbeD6\\ KUUypF')
  # puts "img_container1: #{img_container1}"
  img_container = img_container1.css('img[class=_7DTxhh\\ vc8g9F] > @src')
  # puts "img_container: #{img_container}"

  puts 'getting names and product n img links'

  prod_link = soup_container.css('a > @href')
  prod_name = soup_container.css("div.FDn\\-\\-\\+")

  final_link =[]

  img_data = img_container.map(&:text)

  # puts "img_data: #{img_data}"

  link_data = prod_link.map(&:text)

  name_data = prod_name.map(&:text)



  link_data.each do |data|
    final_link << "https://shopee.sg" + data
  end


  puts "len of urls: #{final_link.length}"


  puts "len of names: #{name_data.length}"

  puts "len of img urls: #{img_data.length}"

  page_count_array = Array.new(name_data.length, page_count+1 )

  platform = Array.new(name_data.length, 'shopee')
  prod_cat_sub = actual.gsub("_", " ")
  prod_cat = Array.new(name_data.length, prod_cat_sub)



  zipped_list = platform.zip(prod_cat,final_link,name_data,img_data,page_count_array)
  zipped_list.each do |url_location_entry| 
    all_p_urls << url_location_entry
  end

  
  page_bool = soup.at_css("div.shopee-mini-page-controller")

  # puts page_bool
  if page_bool.to_s.include?("shopee-button-outline shopee-mini-page-controller__next-btn shopee-button-outline--disabled") || page_count == 5
    puts 'next page does not exist, terminating. Moving onto next keyword...'
    return
  else 
    puts 'moving to next page...'
  end
  puts '-------------------------------------------------------------------------------'

  page_count += 1


  send_request(all_p_urls,page_count,url_keywords,actual,retry_count,error_urls)

rescue NoMethodError => e
  if e.message.include?("undefined method `css' for nil:NilClass")

    retry_count += 1
    if retry_count == 10
      puts 'Search term gives no results. Adding to list of error URLs'
      error_urls << scrape_link
      return
    end

    puts "HTTP Request succeeded, but the required element was not found in the HTML."
    puts "Retrying in 10 seconds..."
    sleep(10)
    send_request(all_p_urls,page_count,url_keywords,actual,retry_count,error_urls)
  else
    puts "HTTP Request failed (#{e.message})"
  end
rescue EOFError => e

  retry_count += 1
  if retry_count == 10
    puts 'Search term cannot be scraped. Moving to next keyword'
    error_urls << scrape_link
    return
  end

  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 10 seconds..."
  sleep(10)
  send_request(all_p_urls,page_count,url_keywords,actual,retry_count,error_urls)


rescue StandardError => e

  if retry_count == 10
    puts 'Search term unable to be scraped, adding to error url'
    error_urls << scrape_link
    return
  end

  puts "HTTP Request failed (end of file reached)"
  puts "Retrying in 10 seconds..."
  sleep(10)
  send_request(all_p_urls,page_count,url_keywords,actual,retry_count,error_urls)
end

keywords.each do |keyword_snippet|

  ## for each keyword
  all_products_urls = []
  page_count = 0
  retry_count = 0

  keyword_actual = keyword_snippet.gsub("%20", "_")

  send_request(all_products_urls,page_count,keyword_snippet,keyword_actual, retry_count,error_urls)



  puts "len of all products for keyword: "
  puts  all_products_urls.length
  puts ' -----------------------------------'
  puts ' -----------------------------------'


  current_time = Time.now
  date_str = current_time.strftime('%d-%m-%Y') # Format the date as YYYY-MM-DD
  time_str = current_time.strftime('%M_%H') # Format the time as HH-MM-SS

  csv_filename = "./keywords_data/shopee_products_by_#{keyword_actual}_#{date_str}_#{time_str}.csv"

  if all_products_urls.length != 0

    CSV.open(csv_filename, 'w') do |csv|
      all_products_urls.each do |row|
        row << date_str
        csv << row
      end
    end

    puts "CSV file '#{csv_filename}' created successfully."

  end

  puts "Moving onto next keyword..."

  

end

puts "ERROR URLS:"
puts error_urls


