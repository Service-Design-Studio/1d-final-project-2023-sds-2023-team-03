# bq_seed.rb
require 'faker'

def generate_products(num = 100) # Generates data for 100 products by default
    products = []
    num.times do
      product = [
        product_id: Faker::Number.unique.between(from: 1, to: 1000), # unique product IDs
        product_category: Faker::Commerce.department,
        product_type: Faker::Commerce.material,
        product_name: Faker::Commerce.product_name,
        price: Faker::Commerce.price(range: 0..1000.0),
        created_at: Faker::Date.between(from: 2.years.ago, to: Date.today),
        updated_at: Faker::Date.between(from: 1.years.ago, to: Date.today),
        stock: Faker::Number.between(from: 0, to: 1000),
        units_sold: Faker::Number.between(from: 0, to: 500),
        description: Faker::Lorem.paragraph,
        image_link: Faker::Internet.url(host: 'example.com', path: "/products/#{Faker::Lorem.word}.jpg")
      ]
      products << product
    end
    products
end
