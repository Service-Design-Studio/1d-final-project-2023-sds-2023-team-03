Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :products, param: :product_category
    end
  end

  # Route requests that are not for existing paths predefined in our API, back to our index path
  get '*path', to: 'pages#index', via: :all
end
