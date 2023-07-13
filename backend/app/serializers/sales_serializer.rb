class SalesSerializer
  include FastJsonapi::ObjectSerializer
  attributes :product_id, :product_category, :product_type, :product_name, :date, :price, :sales
end
