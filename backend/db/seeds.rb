# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

product_units_sold = [
    { name: 'Product A', units_sold: 100 },
    { name: 'Product B', units_sold: 50 },
    { name: 'Product C', units_sold: 200 }
  ]
  
  # Seeding data
  product_units_sold.each do |product_data|
    product = Product.find_or_initialize_by(name: product_data[:name])
    product.units_sold = product_data[:units_sold]
    product.save
  end
  