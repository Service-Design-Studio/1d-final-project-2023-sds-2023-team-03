FactoryBot.define do
    factory :product do
      product_id { 1 }
      product_category { "Running" }
      product_type { "Shorts" }
      product_name { "Small Diamond Car" }
      price { 90.18 }
      stock { 25 }
      units_sold { 55 }
    end
  end