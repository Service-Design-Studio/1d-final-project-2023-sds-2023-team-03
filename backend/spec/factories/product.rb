FactoryBot.define do
  factory :product do
    product_id { Faker::Number.number(digits: 4) }
    product_category { Faker::Commerce.department }
    product_type { Faker::Lorem.word }
    product_name { Faker::Commerce.product_name }
    price { Faker::Commerce.price(range: 0..100.0) }
    stock { Faker::Number.between(from: 0, to: 100) }
    units_sold { Faker::Number.between(from: 0, to: 50) }
  end
end
