Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
     # Autenticación
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      resources :users

      resources :companies
      resources :products

      resources :departments, only: [:index] do
        resources :cities, only: [:index]
      end
    end
  end
 
  get "up" => "rails/health#show", as: :rails_health_check


end