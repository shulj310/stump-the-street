Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#index"
  resources :competitions, only: [:index,:create,:new], to: "static_pages#index"
  resources :portfolios, only: [:show,:create,:new], to: "static_pages#index"

  namespace :api do
    namespace :v1 do
      resources :competitions, only: [:index,:create] do
        resources :portfolios, only: [:show,:create] do
          resources :stocks
        end
      end
    end
  end
end
