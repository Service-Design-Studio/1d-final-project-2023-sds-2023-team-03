require 'rails_helper'

RSpec.describe Api::V1::ProductsController, type: :controller do
  let(:valid_attributes) { { product_id: 3, product_category: 'Running', product_type: 'Shorts', product_name: 'Small Iron Car', price: 80.14, stock: 15, units_sold: 32 } }
  let(:valid_attributes1) { { product_id: 3, product_category: 'Comfortwear', product_type: 'Shorts', product_name: 'Small Iron Car', price: 90.14, stock: 12, units_sold: 32 } }
  let(:invalid_attributes) { { product_id: nil, product_category: nil, product_type: nil, product_name: nil, price: nil, stock: nil, units_sold: nil } }
  let(:product_params) {
          {
              product_id: 1,
              product_category: 'Running',
              product_type: 'Shoes',
              product_name: 'TestCreate ProductShoes',
              price: 89,
              stock: 30,
              units_sold: 20
          }
  }
  let(:product_params1) { { stock: 7 } }
  let(:product_params2) { { stock: 0 } }

  # Create
  describe 'POST #create' do
    it "should successfully create" do
        post :create, params: {product: product_params}
        
        new_product = Product.last
        expect(new_product.product_name).to eq('TestCreate ProductShoes')
        expect(new_product.price).to eq(89)
        expect(new_product.stock).to eq(30)
    end

    it "should not successfully create with invalid parameters, renders a JSON response with errors" do
      post :create, params: {product: invalid_attributes}

      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  # Delete
  describe 'DELETE #delete' do
    it 'should successfully delete' do
        new_product = Product.create! valid_attributes
        
        expect do
          delete :destroy, params: {id: new_product.id}
        end.to change(Product, :count).by(-1)
    end
  end

  # Read
  describe 'GET #show' do
    it 'returns a success response' do
      product = Product.create! valid_attributes
      get :show, params:  { id: product.id }
      expect(response).to be_successful
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  # Update
  describe 'PUT #update' do
    let(:product) { Product.create! valid_attributes }

    context 'with valid params' do
      it 'updates the requested product' do
        put :update, params: { id: product.id, product: valid_attributes1 }
        product.reload
        expect(product.price).to eq(valid_attributes1[:price])
        expect(product.product_category).to eq(valid_attributes1[:product_category])
        expect(product.stock).to eq(valid_attributes1[:stock])
        expect(product.product_id).to eq(valid_attributes[:product_id])
      end

      it 'renders a JSON response with the product' do
        put :update, params: { id: product.id, product: valid_attributes1 }
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the product' do
        put :update, params: { id: product.id, product: invalid_attributes }
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  # Index
  describe 'GET #index' do
    it 'returns a list of all products' do
        new_prod1 = Product.create! valid_attributes
        new_prod2 = Product.create! valid_attributes1
        new_prod3 = Product.create! product_params
        get :index

        parsed_response = JSON.parse(response.body)
        
        expect(response).to have_http_status(:success)
        expect(parsed_response.length).to eq(3)
    end

    context "with category parameter" do
      it 'returns filtered products by category' do
        new_prod1 = Product.create! valid_attributes
        new_prod2 = Product.create! valid_attributes1
        new_prod3 = Product.create! product_params
        get :index, params: { category: new_prod1.product_category }

        parsed_response = JSON.parse(response.body)
        
        expect(response).to have_http_status(:success)
        expect(parsed_response.length).to eq(2)
      end

      it 'returns nothing with a category that does not currently exist' do
        new_prod1 = Product.create! valid_attributes
        new_prod2 = Product.create! valid_attributes1
        new_prod3 = Product.create! product_params
        get :index, params: { category: "Swimming" }

        parsed_response = JSON.parse(response.body)
        
        expect(response).to have_http_status(:success)
        expect(parsed_response.length).to eq(0)
      end
    end

    context "with low parameter" do
      it 'returns 4 or less products with low stock' do
        new_prod1 = Product.create! valid_attributes
        new_prod2 = Product.create! valid_attributes1
        new_prod3 = Product.create! product_params
        get :index, params: { low: 'true' }

        parsed_response = JSON.parse(response.body)
        
        expect(response).to have_http_status(:success)
        expect(parsed_response.length).to eq(3)
      end

      it 'returns 4 products with low stock, given more than 4 products exists' do
        new_prod1 = Product.create! valid_attributes
        new_prod2 = Product.create! valid_attributes1
        new_prod3 = Product.create! product_params
        new_prod4 = Product.create! product_params1
        new_prod5 = Product.create! product_params2
        get :index, params: { low: 'true' }

        parsed_response = JSON.parse(response.body)
        
        expect(response).to have_http_status(:success)
        expect(parsed_response.length).to eq(4)
        expect(parsed_response[3]['stock']).to eq(new_prod5.stock)
        expect(parsed_response[2]['stock']).to eq(new_prod4.stock)
        expect(parsed_response[1]['stock']).to eq(new_prod2.stock)
        expect(parsed_response[0]['stock']).to eq(new_prod1.stock)
      end
    end
  end

  # Update Units Sold
  describe 'PUT #update_units_sold' do
    it 'updates units_sold based on sales data' do
      product1 = Product.create! valid_attributes
      product2 = Product.create! product_params
      sale1 = Sale.create!(product_id: product1.product_id, sales: 60)
      sale2 = Sale.create!(product_id: product2.product_id, sales: 30)

      put :update_units_sold

      product1.reload
      product2.reload

      expect(product1.units_sold).to eq(60)
      expect(product2.units_sold).to eq(30)
    end
  end
end