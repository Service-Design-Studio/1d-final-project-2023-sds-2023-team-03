Rails.application.routes.draw do
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'update_units_sold', to: 'products#update_units_sold'
        end
      end

      resources :sales, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'all', to: 'sales#all'
          get 'top_categories', to: 'sales#top_categories'
          get 'integrity', to: 'sales#integrity'
          get 'sales_data'
          get 'top', to: 'sales#top'
        end
      end

      resources :users, only: [:index, :create, :show, :update, :destroy]
      resources :competitors, only: [:index, :create, :show, :update, :destroy] do
        collection do
          get 'competitor_sales_data'
          get 'overall', to: 'competitors#all'
          get '/:competitor_name', to: 'competitors#query'
        end
      end

      resources :anomalies do
        collection do
          get 'automate_post_deployment'
          get 'detect_anomalies'
          get 'fetch_products'  
          get '/:load_data_into_bigquery', to: 'anomalies#load_data_into_bigquery'
        end
      end

      resources :insights do
        collection do
        end
      end

      post 'classify-category', to: 'category_classification#classify_category'

    end
  end

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
