FactoryBot.define do
  factory :sale do
    product_id { 1 }
    product_category { "Comfortwear" }
    product_type { "Shorts" }
    product_name { "Small Granite Car" }
    date { "2023-01-01" }
    price { 80.14 }
    sales { 10 }
  end
end