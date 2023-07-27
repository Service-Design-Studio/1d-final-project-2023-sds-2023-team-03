Rails.application.routes.draw do
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    namespace :v1 do
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

      # RESTful routes for ScraperController
      resources :scraper, only: [] do
        collection do
          get 'all_products', to: 'scraper#fetch_all_products'
          get 'products_by_category', to: 'scraper#fetch_products_by_category'
          get 'products_by_brand', to: 'scraper#fetch_products_by_brand'
          get 'products_by_date', to: 'scraper#fetch_products_by_date'
          get 'products_by_quantity_sold', to: 'scraper#sort_by_quantity_sold'
          post 'train_kmeans_model', to: 'scraper#train_kmeans_model'
          post 'anomalies', to: 'scraper#detect_anomalies'
          
        end
      end
    end
  end

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
