class ProductSerializer
  include FastJsonapi::ObjectSerializer
  attributes :product_id, :product_category, :product_type, :product_name, :price, :stock
end
