require 'rails_helper'

RSpec.describe Sale, type: :model do
  before do
    @sale1 = FactoryBot.create(:sale, product_category: 'running', sales: 10, date: Date.today - 5.days, price: 50.0)
    @sale2 = FactoryBot.create(:sale, product_category: 'running', sales: 5, date: Date.today - 4.days, price: 30.0)
    @sale3 = FactoryBot.create(:sale, product_category: 'comfortwear', sales: 15, date: Date.today - 3.days, price: 20.0)
    @sale4 = FactoryBot.create(:sale, product_category: 'comfortwear', sales: 20, date: Date.today - 2.days, price: 10.0)
    @sale5 = FactoryBot.create(:sale, product_category: 'comfortwear', sales: 2, date: Date.today - 1.days, price: 15.0)
  end

  context 'category_time_query' do
    it 'returns sales that match a specified category and whose dates are within a given range' do
      start_date = Date.today - 3.days
      end_date = Date.today
      expect(Sale.category_time_query(start_date, end_date, 'comfortwear')).to contain_exactly(@sale3, @sale4, @sale5)
    end
  end

  context 'sales_frequency' do
    it 'returns a hash with x_axis and y_axis representing sales and their frequencies' do
      sales = Sale.all
      result = Sale.sales_frequency(sales)
      expect(result[:x_axis]).to contain_exactly(@sale1.product_name, @sale2.product_name, @sale3.product_name, @sale4.product_name, @sale5.product_name)
      expect(result[:y_axis]).to contain_exactly(@sale1.sales, @sale2.sales, @sale3.sales, @sale4.sales, @sale5.sales)
    end
  end

  context 'sales_revenue' do
    it 'returns a hash with x_axis and y_axis representing sales and their total revenue' do
      sales = Sale.all
      result = Sale.sales_revenue(sales)
      expect(result[:x_axis]).to contain_exactly(@sale1.product_name, @sale2.product_name, @sale3.product_name, @sale4.product_name, @sale5.product_name)
      expect(result[:y_axis]).to contain_exactly(@sale1.sales*@sale1.price, @sale2.sales*@sale2.price, @sale3.sales*@sale3.price, @sale4.sales*@sale4.price, @sale5.sales*@sale5.price)
    end
  end

  context 'top_10_types_category' do
    it 'returns the top 10 types of products in a specified category, sorted by frequency and revenue' do
      sales = Sale.where(product_category: 'comfortwear')
      result = Sale.top_10_types_category(sales)
      expect(result[:frequency][:x_axis]).to contain_exactly(@sale3.product_type, @sale4.product_type, @sale5.product_type)
      expect(result[:frequency][:y_axis]).to contain_exactly(@sale3.sales, @sale4.sales, @sale5.sales)
      expect(result[:revenue][:x_axis]).to contain_exactly(@sale3.product_type, @sale4.product_type, @sale5.product_type)
      expect(result[:revenue][:y_axis]).to contain_exactly(@sale3.sales*@sale3.price, @sale4.sales*@sale4.price, @sale5.sales*@sale5.price)
    end
  end

  context 'top_categories_date' do
    it 'returns the top categories within a specified date range, sorted by units and amount' do
      start_date = Date.today - 3.days
      end_date = Date.today
      result = Sale.top_categories_date(start_date, end_date)
      expect(result[:units]).to eq({"comfortwear" => (@sale3.sales + @sale4.sales + @sale5.sales)})
      expect(result[:amount]).to eq({"comfortwear" => (@sale3.sales*@sale3.price + @sale4.sales*@sale4.price + @sale5.sales*@sale5.price)})
    end
  end
end
