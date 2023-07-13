Rails.application.routes.draw do
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      post '/session', to: 'sessions#create'
      delete '/session', to: 'sessions#destroy'
      get '/session', to: 'sessions#is_logged_in?'
      get '/set_admin', to: 'sessions#set_admin!'

      resources :products
      resources :sales, only: [:index, :show, :create, :update, :destroy]
      resources :users, only: [:create, :show, :index]
    end
  end 

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
