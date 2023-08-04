# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'

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

# Generate 200 sales
existing_product_ids = Product.pluck(:product_id)
200.times do
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
