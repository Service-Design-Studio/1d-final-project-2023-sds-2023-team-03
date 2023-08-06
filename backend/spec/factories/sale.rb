FactoryBot.define do
    factory :sale do
      product_id { Faker::Number.number(digits: 4) }
      product_category { Faker::Commerce.department }
      product_type { Faker::Lorem.word }
      product_name { Faker::Commerce.product_name }
      date { Faker::Date.between(from: 2.days.ago, to: Date.today) }
      price { Faker::Commerce.price(range: 0..100.0) }
      sales { Faker::Number.between(from: 0, to: 100) }
    end
  end
  