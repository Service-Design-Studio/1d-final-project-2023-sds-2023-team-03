require 'rails_helper'

RSpec.describe Api::V1::CompetitorsController, type: :controller do
    let(:valid_params) {
        {
            competitor_name: 'Under Armour',
            product_id: 1,
            product_category: 'Comfortwear',
            product_type: 'Shoes',
            product_name: 'TestCreate CompShoes',
            price: 89.99,
            stock: 55,
            sales: 23,
            date: '2023-07-12'
        }
    }
    let(:valid_params1) {
        {
            competitor_name: 'Competitor A',
            product_id: 1,
            product_category: 'Comfortwear',
            product_type: 'Shoes',
            product_name: 'TestCreate CompShoes',
            price: 79.99,
            stock: 55,
            sales: 23,
            date: '2023-07-12'
        }
    }
    let(:invalid_params) {
        {
            competitor_name: nil,
            product_id: nil,
            product_category: nil,
            product_type: nil,
            product_name: nil,
            price: nil,
            stock: nil,
            sales: nil,
            date: nil
        }
    }
    let(:competitor_sale1) { create(:competitor, competitor_name: 'Test Competitor', product_id: 1, sales: 100) }
    let(:competitor_sale2) { create(:competitor, competitor_name: 'Test Competitor', product_id: 2, sales: 200) }
    let(:competitor_sale3) { create(:competitor, competitor_name: 'Test Competitor', product_id: 3, sales: 156) }
    let(:competitor_sale4) { create(:competitor, competitor_name: 'Test Competitor', product_id: 4, sales: 77) }
    let(:competitor_sale5) { create(:competitor, competitor_name: 'Test Competitor', product_id: 5, sales: 90) }
    let(:competitor_sale6) { create(:competitor, competitor_name: 'Test Competitor', product_id: 6, sales: 299) }

    before do
        competitor_sale1
        competitor_sale2
        competitor_sale3
        competitor_sale4
        competitor_sale5
        competitor_sale6
    end

    # Create
    describe 'POST #create' do
        it "should successfully create" do
            post :create, params: {competitor: valid_params}
            
            new_comp = Competitor.last
            expect(new_comp.product_name).to eq('TestCreate CompShoes')
            expect(new_comp.price).to eq(89.99)
            expect(new_comp.sales).to eq(23)
        end

        it "should not successfully create with invalid parameters, renders a JSON response with errors" do
            post :create, params: {competitor: invalid_params}
            
            expect(response.content_type).to eq('application/json; charset=utf-8')
        end
    end

    # Index
    describe "GET #index" do
        it "returns a successful response" do
        get :index, params: { id: competitor_sale1.competitor_name }
        expect(response).to have_http_status(:success)
        end

        it "returns the correct JSON response" do
        get :index, params: { id: competitor_sale1.competitor_name }
        parsed_response = JSON.parse(response.body)

        expect(parsed_response).to have_key('top_sales')
        expect(parsed_response).to have_key('all_data')
        expect(parsed_response).to have_key('highest_selling_product')
        end

        it "returns the correct top sales data" do
        get :index, params: { id: competitor_sale1.competitor_name }
        parsed_response = JSON.parse(response.body)

        expect(parsed_response['top_sales'].length).to eq(5)
        expect(parsed_response['top_sales'][0]['id']).to eq(competitor_sale6.product_id)
        expect(parsed_response['top_sales'][1]['id']).to eq(competitor_sale2.product_id)
        expect(parsed_response['top_sales'][2]['id']).to eq(competitor_sale3.product_id)
        expect(parsed_response['top_sales'][3]['id']).to eq(competitor_sale1.product_id)
        expect(parsed_response['top_sales'][4]['id']).to eq(competitor_sale5.product_id)
        end

        it "returns the correct highest selling product data" do
        get :index, params: { id: competitor_sale1.competitor_name }
        parsed_response = JSON.parse(response.body)

        expect(parsed_response['highest_selling_product']['id']).to eq(competitor_sale6.product_id)
        end
    end

    # Delete
    describe 'DELETE #delete' do
        it 'should successfully delete' do
            new_comp = Competitor.create! valid_params
            
            expect do
            delete :destroy, params: {id: new_comp.product_id}
            end.to change(Competitor, :count).by(-1)
        end
    end

    # Read
    describe 'GET #show' do
        it 'returns a success response' do
        comp = Competitor.create! valid_params
        get :show, params:  { id: comp.product_id }
        expect(response).to be_successful
        expect(response.content_type).to eq('application/json; charset=utf-8')
        end
    end

    # Update
    describe 'PUT #update' do
        let(:competitorsale) { Competitor.create! valid_params }

        context 'with valid params' do
        it 'updates the requested competitor sale entry' do
            put :update, params: { id: competitorsale.id, competitor: valid_params1 }
            competitorsale.reload
            expect(competitorsale.price).to eq(valid_params1[:price])
            expect(competitorsale.product_id).to eq(valid_params[:product_id])
        end

        it 'renders a JSON response with the competitor sale entry' do
            put :update, params: { id: competitorsale.id, competitor: valid_params1 }
            expect(response.content_type).to eq('application/json; charset=utf-8')
        end
        end

        context 'with invalid params' do
        it 'renders a JSON response with errors for the competitor sale' do
            put :update, params: { id: competitorsale.id, competitor: invalid_params }
            expect(response.content_type).to eq('application/json; charset=utf-8')
        end
        end
    end

    # All
    describe 'GET #all' do
        it 'returns a list of all competitors' do
            get :all
    
            parsed_response = JSON.parse(response.body)
            
            expect(response).to have_http_status(:success)
            expect(parsed_response.length).to eq(6)
        end
    end
end