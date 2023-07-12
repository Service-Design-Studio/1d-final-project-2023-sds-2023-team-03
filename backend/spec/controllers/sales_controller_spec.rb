require 'rails_helper'

RSpec.describe Api::V1::SalesController, type: :controller do
  let(:valid_attributes) { { product_id: 2, product_category: "Comfortwear", product_type: "Shorts", product_name: "Small Granite Car", date: "2023-01-01", price: 80.14, sales: 15 } }
  let(:invalid_attributes) { { product_id: nil, product_category: nil, product_type: nil, product_name: nil, date: nil, price: nil, sales: nil } }
  let(:sale_params) {
          {
              product_id: 1,
              product_category: 'Running',
              product_type: 'Shoes',
              product_name: 'TestCreate Shoes',
              date: '2023-07-12',
              price: 100,
              sales: 8
          }
  }

  # Create
  describe 'POST create' do
    it "should successfully create" do
        post :create, params: {sale: sale_params}
        
        new_sale = Sale.last
        expect(new_sale.product_name).to eq('TestCreate Shoes')
        expect(new_sale.price).to eq(100)
        expect(new_sale.sales).to eq(8)
    end
end

  # Read
  describe 'GET #show' do
    it 'returns a success response' do
      sale = Sale.create! valid_attributes
      get :show, params:  { id: sale.id }
      expect(response).to be_successful
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  # Update
  describe 'PUT #update' do
    let(:sale) { Sale.create! valid_attributes }

    context 'with valid params' do
      it 'updates the requested sale' do
        put :update, params: { id: sale.id, sale: valid_attributes }
        sale.reload
        expect(sale.product_id).to eq(valid_attributes[:product_id])
      end

      it 'renders a JSON response with the sale' do
        put :update, params: { id: sale.id, sale: valid_attributes }
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the sale' do
        put :update, params: { id: sale.id, sale: invalid_attributes }
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
end
