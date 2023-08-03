require 'rails_helper'

RSpec.describe Api::V1::SalesController, type: :controller do
  let(:valid_attributes) { { product_id: 2, product_category: 'Comfortwear', product_type: 'Shorts', product_name: 'Small Granite Car', date: '2023-01-01', price: 80.14, sales: 15 } }
  let(:valid_attributes1) { { product_id: 2, product_category: 'Comfortwear', product_type: 'Shorts', product_name: 'Small Granite Car', date: '2023-01-01', price: 90.14, sales: 15 } }
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
  let(:sale_params2) {
    {
        product_id: 3,
        product_category: 'Running',
        product_type: 'Tshirts',
        product_name: 'TestCreate Shirt',
        date: '2023-07-20',
        price: 100,
        sales: 9
    }
}
let(:sale_params3) {
  {
      product_id: 4,
      product_category: 'Running',
      product_type: 'Shorts',
      product_name: 'TestCreate Shorts',
      date: '2023-07-29',
      price: 100,
      sales: 10
  }
}
let(:new_sale4) { Sale.create! sale_params }
let(:new_sale5) { Sale.create! sale_params2 }
let(:new_sale6) { Sale.create! sale_params3 }

  # Create
  describe 'POST #create' do
    it "should successfully create" do
        post :create, params: {sale: sale_params}
        
        new_sale = Sale.last
        expect(new_sale.product_name).to eq('TestCreate Shoes')
        expect(new_sale.price).to eq(100)
        expect(new_sale.sales).to eq(8)
    end
  end

  # Delete
  describe 'DELETE #delete' do
    it 'should successfully delete' do
        new_sale = Sale.create! valid_attributes
        
        expect do
          delete :destroy, params: {id: new_sale.id}
        end.to change(Sale, :count).by(-1)
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
        put :update, params: { id: sale.id, sale: valid_attributes1 }
        sale.reload
        expect(sale.price).to eq(valid_attributes1[:price])
        expect(sale.product_id).to eq(valid_attributes[:product_id])
      end

      it 'renders a JSON response with the sale' do
        put :update, params: { id: sale.id, sale: valid_attributes1 }
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

  # Index
  describe 'GET #index' do
    it 'returns a list of all sales' do
        new_sale1 = Sale.create! valid_attributes
        new_sale2 = Sale.create! valid_attributes1
        new_sale3 = Sale.create! sale_params
        get :index

        parsed_response = JSON.parse(response.body)
        
        expect(response).to have_http_status(:success)
        expect(parsed_response.length).to eq(3)
    end
  end

  # Query
  describe "GET #index" do
    before do
      new_sale4
      new_sale5
      new_sale6
    end

    it "returns a successful response" do
    get :index, params: { category: new_sale4.product_category, start:'2023-06-01', end: '2023-08-01' }
    expect(response).to have_http_status(:success)
    end

    it "returns the correct JSON response" do
    get :index, params: { category: new_sale4.product_category, start:'2023-06-01', end: '2023-08-01' }
    parsed_response = JSON.parse(response.body)

    expect(parsed_response).to have_key('frequencies')
    expect(parsed_response).to have_key('revenues')
    expect(parsed_response).to have_key('types')
    end

    it "returns the correct frequencies data in descending order" do
    get :index, params: { category: new_sale4.product_category, start:'2023-06-01', end: '2023-08-01' }
    parsed_response = JSON.parse(response.body)


    expect(parsed_response['frequencies']['x_axis'].length).to eq(3)
    expect(parsed_response['frequencies']['x_axis'][0]).to eq(new_sale6.product_name)
    expect(parsed_response['frequencies']['x_axis'][1]).to eq(new_sale5.product_name)
    expect(parsed_response['frequencies']['x_axis'][2]).to eq(new_sale4.product_name)
    end

    it "returns the correct revenues data in descending order" do
    get :index, params: { category: new_sale4.product_category, start:'2023-06-01', end: '2023-08-01' }
    parsed_response = JSON.parse(response.body)

    expect(parsed_response['revenues']['x_axis'].length).to eq(3)
    expect(parsed_response['revenues']['x_axis'][0]).to eq(new_sale6.product_name)
    expect(parsed_response['revenues']['x_axis'][1]).to eq(new_sale5.product_name)
    expect(parsed_response['revenues']['x_axis'][2]).to eq(new_sale4.product_name)
    end

    it "returns the correct types data in frequencies descending order" do
      thirty_days_later = (Date.today + 30).strftime('%Y-%m-%d')
      thirty_days_ago = (Date.today - 30).strftime('%Y-%m-%d')
      get :index, params: { category: new_sale4.product_category, start:'2023-06-01', end: '2023-08-01' }
      parsed_response = JSON.parse(response.body)
  
      expect(parsed_response['types']['frequency']['x_axis'].length).to eq(3)
      expect(parsed_response['types']['frequency']['x_axis'][0]).to eq(new_sale6.product_type)
      expect(parsed_response['types']['frequency']['x_axis'][1]).to eq(new_sale5.product_type)
      expect(parsed_response['types']['frequency']['x_axis'][2]).to eq(new_sale4.product_type)
      end

    it "returns the an error for future dates" do
      thirty_days_later = (Date.today + 30).strftime('%Y-%m-%d')
      thirty_days_ago = (Date.today - 30).strftime('%Y-%m-%d')
      get :index, params: { category: new_sale4.product_category, start: thirty_days_later, end: thirty_days_ago }
      parsed_response = JSON.parse(response.body)

      expect(parsed_response['frequencies']['x_axis'].length).to eq(0)
      expect(parsed_response['revenues']['x_axis'].length).to eq(0)
    end
  end
end