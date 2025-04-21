Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      post '/login', to: 'users#login'
      delete '/logout', to: 'users#logout'

      resources :companies

      resources :departments, only: [:index] do
        resources :cities, only: [:index]
      end
    end
  end
 
  get "up" => "rails/health#show", as: :rails_health_check


end