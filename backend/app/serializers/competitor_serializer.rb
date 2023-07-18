class CompetitorSerializer
  include FastJsonapi::ObjectSerializer
  attributes :competitor_name, :product_id, :product_category, :product_type, :product_name, :price, :stock, :sales, :date
end
