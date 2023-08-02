FactoryBot.define do
    factory :competitor do
        competitor_name { "Under Armour" }
        product_id { 1 }
        product_category { "Comfortwear" }
        product_type { "Shoes" }
        product_name { "Test Shoes" }
        price { 100 }
        stock { 200 }
        sales { 99 }
        date { "2023-01-01" }
    end
end