require 'rails_helper'

RSpec.describe Product, type: :model do
  before do
    @product1 = FactoryBot.create(:product, product_category: 'running', stock: 10)
    @product2 = FactoryBot.create(:product, product_category: 'running', stock: 5)
    @product3 = FactoryBot.create(:product, product_category: 'comfortwear', stock: 15)
    @product4 = FactoryBot.create(:product, product_category: 'comfortwear', stock: 20)
    @product5 = FactoryBot.create(:product, product_category: 'comfortwear', stock: 2)
  end

  context 'bottom_four' do
    it 'returns the four products with the lowest stock' do
      expect(Product.bottom_four).to contain_exactly(@product2, @product5, @product1, @product3)
    end

    it 'returns all products if there are less than four products' do
      [@product1, @product2, @product3].each(&:destroy)
      expect(Product.bottom_four).to contain_exactly(@product4, @product5)
    end

    it 'returns an empty array if there are no products' do
      [@product1, @product2, @product3, @product4, @product5].each(&:destroy)
      expect(Product.bottom_four).to eq([])
    end
  end

  context 'search_category' do
    it 'returns all products in a specific category' do
      expect(Product.search_category('running')).to contain_exactly(@product1, @product2)
    end

    it 'returns an empty array for a non-existent category' do
      expect(Product.search_category('NonexistentCategory')).to eq([])
    end
  end

  context 'filter_category' do
    it 'filters a given query to a specific category' do
      q = Product.all
      expect(Product.filter_category(q, 'comfortwear')).to contain_exactly(@product3, @product4, @product5)
    end

    it 'returns an empty array for an empty query' do
      q = Product.none
      expect(Product.filter_category(q, 'comfortwear')).to eq([])
    end

    it 'returns an empty array for a non-existent category' do
      q = Product.all
      expect(Product.filter_category(q, 'NonexistentCategory')).to eq([])
    end
  end
end
