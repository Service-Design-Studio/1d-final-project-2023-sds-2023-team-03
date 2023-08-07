FactoryBot.define do
  factory :lazada_datum do
    merchant_name { "MyString" }
    keyword { "MyString" }
    competitor_name { "MyString" }
    product_name { "MyString" }
    coupon { "MyString" }
    initial_price { 1.5 }
    final_price { 1.5 }
    sales { 1 }
    product_link { "MyString" }
    product_image_link { "MyString" }
    date_scraped { "2023-08-07" }
    discount { 1.5 }
  end
end
