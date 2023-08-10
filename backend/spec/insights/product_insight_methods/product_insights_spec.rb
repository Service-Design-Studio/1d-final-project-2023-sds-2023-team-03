require 'rails_helper'
require 'ostruct'
require_relative '../../../lib/insights/insights_config.rb'
require_relative '../../../lib/insights/product_insight_methods/apply_declining_seven_days.rb'
require_relative '../../../lib/insights/product_insight_methods/apply_popular.rb'
require_relative '../../../lib/insights/product_insight_methods/apply_sales_change.rb'

RSpec.describe ProductInsights, type: :module do
  describe '.apply_declining_seven_days' do
    let(:product) { { "product_id" => 1, :insights => [] } }
    let(:sales_data) { double }

    context 'when sales are declining for more than 3 days' do
      before do
        (1..7).each do |day|
          allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, day.days.ago.to_date).with(:sales).and_return(10)
        end
        # Modify the sales of a couple of days to simulate a decline
        allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, 1.days.ago.to_date).with(:sales).and_return(6)
        allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, 2.days.ago.to_date).with(:sales).and_return(5)
        allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, 3.days.ago.to_date).with(:sales).and_return(4)
        allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, 4.days.ago.to_date).with(:sales).and_return(3)
      end

      it 'attempts to apply the declining insight logic' do
        expect { ProductInsights.apply_declining_seven_days(product, sales_data) }.not_to raise_error
      end
    end

    context 'when sales are not declining for more than 3 days' do
      before do
        (1..7).each do |day|
          allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, day.days.ago.to_date).with(:sales).and_return(5)
        end
      end

      it 'does not append the declining insight to the product' do
        ProductInsights.apply_declining_seven_days(product, sales_data)
        expect(product[:insights]).to be_empty
      end
    end

    context 'when there are no sales for the product' do
      before do
        (1..7).each do |day|
          allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, day.days.ago.to_date).with(:sales).and_return(0)
        end
      end

      it 'does not append any insight to the product' do
        ProductInsights.apply_declining_seven_days(product, sales_data)
        expect(product[:insights]).to be_empty
      end
    end

    context 'when sales are increasing over the 7 days' do
      before do
        (1..7).each do |day|
          allow(sales_data).to receive_message_chain(:where, :sum).with('product_id = ? AND date = ?', 1, day.days.ago.to_date).with(:sales).and_return(day)
        end
      end

      it 'does not append the declining insight to the product' do
        ProductInsights.apply_declining_seven_days(product, sales_data)
        expect(product[:insights]).to be_empty
      end
    end
  end
  describe '.apply_popular' do
    let(:product) { { "product_id" => 1, "stock" => 150, :insights => [] } }
    let(:sales_data) { double }

    before do
      allow(Sale).to receive(:top_sales_time_range).and_return({ 2 => 300, 3 => 250, 4 => 200, 5 => 150, 6 => 100 })
    end

    context 'when there are no sales for the product in the last month' do
      before do
        allow(sales_data).to receive(:where).and_return(nil)
      end

      it 'does not append any insights' do
        ProductInsights.apply_popular(product, sales_data)
        expect(product[:insights]).to be_empty
      end
    end

    context 'when sales are less than 100 in the last month' do
      before do
        allow(sales_data).to receive_message_chain(:where, :sum).and_return(50)
      end

      it 'does not append any insights' do
        ProductInsights.apply_popular(product, sales_data)
        expect(product[:insights]).to be_empty
      end
    end

    context 'when sales are more than 100 but not in top 5' do
      before do
        allow(sales_data).to receive_message_chain(:where, :sum).and_return(120)
      end

      it 'appends the popular insight' do
        ProductInsights.apply_popular(product, sales_data)
        expect(product[:insights].any? {|i| i[:name] == :popular}).to be true
      end
    end

    context 'when sales are in top 5 and more than 100' do
      before do
        allow(Sale).to receive(:top_sales_time_range).and_return({ 1 => 300, 2 => 250, 3 => 200, 4 => 150, 5 => 100 })
        allow(sales_data).to receive_message_chain(:where, :sum).and_return(300)
      end

      it 'appends the popular insight indicating top 5 sales' do
        ProductInsights.apply_popular(product, sales_data)
        expect(product[:insights].any? {|i| i[:name] == :popular && i[:text].include?('top 5')}).to be true
      end
    end

    context 'when sales are more than 100 and stock is less than total sales' do
      let(:product) { { "product_id" => 1, "stock" => 90, :insights => [] } }

      before do
        allow(sales_data).to receive_message_chain(:where, :sum).and_return(120)
      end

      it 'appends the popular_low_stock insight' do
        ProductInsights.apply_popular(product, sales_data)
        expect(product[:insights].any? {|i| i[:name] == :popular_low_stock}).to be true
      end
    end
  end
  describe '.apply_sales_change' do
    let(:product) { { "product_id" => 1, :insights => [] } }
    let(:sales_data) { double }

    # Helper method to mock the sum behavior on the sales_data double
    def mock_sales_sum(sales_data, product_id, date, sales_value)
        query_result = [OpenStruct.new(sales: sales_value)]
        allow(sales_data).to receive(:where).with('product_id = ? AND date = ?', product_id, date).and_return(query_result)
        allow(query_result).to receive(:sum).with(:sales).and_return(sales_value)
    end
    

    context 'when there are no sales yesterday or today' do
      before do
        allow(sales_data).to receive(:where).and_return(nil)
      end

      it 'appends the no sales insight' do
        ProductInsights.apply_sales_change(product, sales_data)
        expect(product[:insights].first[:name]).to eq(:sales_change)
        expect(product[:insights].first[:text]).to eq("There were no sales for this product yesterday or today.")
      end
    end

    context 'when sales go from 0 to a positive number' do
        before do
          mock_sales_sum(sales_data, 1, 1.day.ago.to_date, 0)
          mock_sales_sum(sales_data, 1, Time.current.to_date, 10)
        end

        it 'appends the sales increase insight' do
            ProductInsights.apply_sales_change(product, sales_data)
            expect(product[:insights].first[:name]).to eq(:sales_change)
            expect(product[:insights].first[:text]).to eq("Sales for this product has gone from 0 to 10 in the past 24 hours (#{1.day.ago.to_date}).")
        end
    end

    context 'when sales increase by more than 25%' do
        before do
          mock_sales_sum(sales_data, 1, 1.day.ago.to_date, 10)
          mock_sales_sum(sales_data, 1, Time.current.to_date, 30)
        end
      
        it 'appends the appropriate insight indicating a significant increase' do
          ProductInsights.apply_sales_change(product, sales_data)
          expect(product[:insights].first[:name]).to eq(:sales_change)
          expect(product[:insights].first[:text]).to eq("Sales for this product have risen by 300% since 24 hours ago (#{1.day.ago.to_date}).")
        end
      end
      
      context 'when sales decrease by more than 25%' do
        before do
          mock_sales_sum(sales_data, 1, 1.day.ago.to_date, 40)
          mock_sales_sum(sales_data, 1, Time.current.to_date, 10)
        end
      
        it 'appends the appropriate insight indicating a significant decrease' do
          ProductInsights.apply_sales_change(product, sales_data)
          expect(product[:insights].first[:name]).to eq(:sales_change)
          expect(product[:insights].first[:text]).to eq("Sales for this product have dropped by 100% since 24 hours ago (#{1.day.ago.to_date}).")
        end
      end
      
      context 'when sales remain the same' do
        before do
          mock_sales_sum(sales_data, 1, 1.day.ago.to_date, 25)
          mock_sales_sum(sales_data, 1, Time.current.to_date, 25)
        end
      
        it 'appends an insight indicating no change' do
          ProductInsights.apply_sales_change(product, sales_data)
          expect(product[:insights].first[:name]).to eq(:sales_change)
          expect(product[:insights].first[:text]).to eq("Sales for this product have not changed since 24 hours ago (#{1.day.ago.to_date}).")
        end
      end

  end
end
