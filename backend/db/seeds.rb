# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'csv'
require 'uri'
require 'concurrent-ruby'
include VertexAiHelper

# Generate 200 products
200.times do
  Product.create(
    product_id: Faker::Number.unique.number(digits: 7),
    product_category: ['Comfortwear', 'Running'].sample,
    product_type: ['Shoes', 'Tshirts', 'Shorts', 'Accessories'].sample,
    product_name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10.0..200.0),
    stock: rand(0..500),
    units_sold: rand(0..155),
    description: Faker::Lorem.paragraph(sentence_count: 5),
    image_link: ["https://cdn.dribbble.com/users/115601/screenshots/1075457/shoeshaded.jpg",
      "https://media.sketchfab.com/models/090413b247ed41d6a8b45e321e58e543/thumbnails/9720380901344db0a462f800ad36f999/43c4225f2ff54377a1fda223c6f44dfe.jpeg",
      "https://www.3dcadbrowser.com/th/1/105/105296.webp",
      "https://img.freepik.com/premium-photo/blue-sneaker-sole-concept-bright-fashionable-sneakers-3d-rendering_116124-12470.jpg",
      "https://img.freepik.com/premium-photo/colorful-brown-sneakers-sole-concept-bright-fashionable-sneakers-3d-rendering_116124-12519.jpg?w=360"
      ].sample
  )
end

# Generate 1000 sales
existing_product_ids = Product.all.pluck(:product_id)
1000.times do
  product_id = existing_product_ids.sample

  # Use the selected product_id to get the corresponding product details
  product = Product.find_by(product_id: product_id)

  Sale.create(
    product_id: product_id,
    product_category: product.product_category,
    product_type: product.product_type,
    product_name: product.product_name,
    date: Faker::Date.between(from: '2021-01-01', to: Date.today),
    price: Faker::Commerce.price(range: 10.0..200.0),
    sales: rand(0..200),
  )
end

sales = Sale.all
products = Product.all

products.each do |product|
  product_sales = sales.where('product_id = ?', product.product_id)
  if (!product_sales)
    next
  end

  qty_sold = 0
  product_sales.each do |sale|
    qty_sold += sale.sales
  end

  product.update(units_sold: qty_sold)
end

# Generate 200 competitors
200.times do
  Competitor.create(
    competitor_name: ['Adidas', 'Nike', 'Under Armour', 'Skechers'].sample,
    product_id: Faker::Number.unique.number(digits: 7),
    product_category: ['Comfortwear', 'Running'].sample,
    product_type: ['Shoes', 'Tshirts', 'Shorts', 'Accessories'].sample,
    product_name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10.0..200.0),
    stock: rand(0..500),
    sales: rand(0..200),
    date: Faker::Date.between(from: '2021-01-01', to: Date.today).end_of_month
  )
end

Dir[Rails.root.join('scraper/Lazada/data/*')].each do |filename|
  next if filename.include?("Comfortwear") || filename.include?("Running")

  CSV.foreach(filename) do |row|
    # initial_price = row[5] == "No Price Reduction" ? row[6].delete("$").to_f : row[5].delete("$").to_f
    # final_price = row[6].delete("$").to_f
    initial_price = (row[5] && row[5] != "No Price Reduction") ? row[5].delete("$").to_f : (row[6] ? row[6].delete("$").to_f : 0)
    final_price = row[6] ? row[6].delete("$").to_f : 0
    discount = initial_price != 0 ? (1 - (final_price/initial_price)) * 100 : 0

    LazadaData.find_or_create_by(product_name: row[3]) do |data|
      data.merchant_name = row[0],
      data.keyword = row[1],
      data.competitor_name = row[2],
      data.product_name = row[3],
      data.coupon = row[4],
      data.initial_price = initial_price,
      data.final_price = final_price,
      data.sales = row[7].to_i,
      data.product_link = row[8],
      data.product_image_link = row[9],
      data.product_description = row[10],
      data.date_scraped = Date.strptime(row[11], "%d-%m-%Y"),
      data.discount = discount
      data.category = "NIL"
    end
  end
end

Dir[Rails.root.join('scraper/Shopee/data/*')].each do |filename|
  next if filename.include?("Comfortwear") || filename.include?("Running")

  CSV.foreach(filename) do |row|
    initial_price = (row[5] && row[5] != "No Price Reduction") ? row[5].delete("$").to_f : (row[6] ? row[6].delete("$").to_f : 0)
    final_price = row[6] ? row[6].delete("$").to_f : 0

    ShopeeData.find_or_create_by(product_name: row[3]) do |data|
      data.merchant_name = row[0],
      data.keyword = row[1],
      data.competitor_name = row[2],
      data.product_name = row[3],
      data.coupon = row[4],
      data.initial_price = initial_price,
      data.final_price = final_price,
      data.sales = row[7].to_i,
      data.product_link = row[8],
      data.product_image_link = row[9],
      data.product_description = row[10],
      data.date_scraped = Date.strptime(row[11], "%d-%m-%Y"),
      data.discount = initial_price != 0 ? (1 - (final_price/initial_price)) * 100 : 0
      data.category = "NIL"
    end
  end
end

Dir[Rails.root.join('scraper/Lazada/keywords_data/*')].each do |filename|
  CSV.foreach(filename) do |row|
    lazada_data = LazadaData.find_by(product_name: row[3])
    if lazada_data
      lazada_data.update(keyword: row[1])
    end
  end
end

Dir[Rails.root.join('scraper/Shopee/keywords_data/*')].each do |filename|
  CSV.foreach(filename) do |row|
    shopee_data = ShopeeData.find_by(product_name: row[3])
    if shopee_data
      shopee_data.update(keyword: row[1])
    end
  end
end

# Define a cache to store API responses
api_response_cache = {}
api_response_cache_lock = Mutex.new

# Track calls
api_state = { api_calls_start_time: Time.now, api_call_count: 0 }

def update_category_for_product_data(product_data, api_response_cache, api_response_cache_lock, api_state)
  if Time.now - api_state[:api_calls_start_time] >= 60
    puts "reset"
    api_state[:api_calls_start_time] = Time.now
    api_state[:api_call_count] = 0
  end

  if product_data.category == "NIL"
    prod_text = "Product Name: #{product_data.product_name}\nProduct Description: #{product_data.product_description}"
    
    response = nil
    retries = 3

    retries.times do |retry_count|
      api_response_cache_lock.synchronize do
        if api_response_cache.key?(prod_text)
          response = api_response_cache[prod_text]
        else
          if api_state[:api_call_count] < 60
            response = perform_vertex_ai_request(prod_text)
            api_state[:api_call_count] = api_state[:api_call_count] + 1
          end
        end
      end
      
      if !response.nil?
        api_response_cache[prod_text] = response
        break
      else
        puts("API call failed, retrying (attempt #{retry_count + 1})...")
      end

      if (retry_count == 1 && response.nil?)
        puts("API call failed, retrying (attempt 3)...")
        puts "sleep time: #{60 - (Time.now - api_state[:api_calls_start_time])}"
        sleep(60 - (Time.now - api_state[:api_calls_start_time]))
      end
    end

    if response
      if response.key?('predictions') && response['predictions'].first.key?('content')
        category = response['predictions'].first['content']
        product_data.update(category: category)
        product_data.save!
        puts("category updated! new: #{category}")
      else
        puts("Unexpected response format: #{response}")
      end
    else
      # Handle error
      puts("#{product_data.product_name}, #{product_data.product_description}")
      puts("Error occurred during category classification")
    end
  else
    # puts "skipped"
    return
  end
end

all_shopee_data = ShopeeData.all
all_lazada_data = LazadaData.all

all_product_data = all_shopee_data + all_lazada_data

num_threads = 4

all_data_batches = all_product_data.each_slice(all_product_data.size / num_threads).to_a

thread_pool = Concurrent::ThreadPoolExecutor.new(
  min_threads: num_threads,
  max_threads: num_threads
)

all_data_batches.each do |batch|
  batch.each do |product_data|
    thread_pool.post { update_category_for_product_data(product_data, api_response_cache, api_response_cache_lock, api_state) }
  end
end

thread_pool.shutdown
thread_pool.wait_for_termination

