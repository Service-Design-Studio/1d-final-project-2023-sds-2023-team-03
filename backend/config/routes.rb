Rails.application.routes.draw do
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show]
      resources :sales, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'sales_data'
        end
      end
      resources :users, only: [:create, :show, :index]
      resources :competitors, only: [:index, :show] do
        collection do
          get 'competitor_sales_data'
          get 'all'
        end
      end

      # Routes for ScraperController
      get 'fetch_all_products', to: 'scraper#fetch_all_products'
      get 'fetch_products_by_category', to: 'scraper#fetch_products_by_category'
      get 'fetch_products_by_brand', to: 'scraper#fetch_products_by_brand'
      get 'fetch_products_by_date', to: 'scraper#fetch_products_by_date'
      get 'sort_by_quantity_sold', to: 'scraper#sort_by_quantity_sold'

      # New route for detect_anomalies action
      post 'detect_anomalies', to: 'scraper#detect_anomalies'
    end
  end

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
