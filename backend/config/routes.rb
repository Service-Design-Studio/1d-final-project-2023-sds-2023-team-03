Rails.application.routes.draw do
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show, :create, :update, :destroy] do
      end

      resources :sales, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'all', to: 'sales#all'
          get 'top_categories', to: 'sales#top_categories'
          get 'sales_data'
        end
      end

      resources :users, only: [:create, :show, :index]

      get 'competitors/all', to: 'competitors#all'
      resources :competitors, only: [:index, :show] do
        collection do
          get 'competitor_sales_data'
        end
      end
      # get '/competitors/:competitor_name', to: 'competitors#show'
    end
  end

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
