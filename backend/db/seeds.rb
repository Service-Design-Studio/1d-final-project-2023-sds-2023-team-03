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
    date: Faker::Date.between(from: '2021-01-01', to: Date.today),
    price: Faker::Commerce.price(range: 10.0..200.0),
    sales: rand(0..200)
  )
end
