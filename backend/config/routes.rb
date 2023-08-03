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

      resources :anomalies, only: [] do
        collection do
          get 'create_temp_anomalies_table'
          get 'create_quantity_stats_table'
          get 'join_anomalies_with_stats'
        end
      end
    end
  end

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
