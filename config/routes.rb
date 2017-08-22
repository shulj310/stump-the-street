Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: "users/sessions",passwords: "users/passwords", registrations: "users/registrations"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#index"
  resources :research, only: [:index], to: "static_pages#index"
  resources :competitors, only: [:index], to: "static_pages#index"
  resources :competitions, only: [:index,:create,:new], to: "static_pages#index" do
    resources :portfolios, only: [:show,:create,:new], to: "static_pages#index"
  end

  namespace :api do
    namespace :v1 do
      resources :research, only: [:index,:update] do
        get "search"
        get "industry_comp"
        get "header"
      end
      resources :trade_queues, only: [:show,:update,:destroy]
      resources :users, only: [:show,:update]
      resources :stocks, only: [:show]
      resources "stocks" do
        get "fund_data"
        get "hist_price"
        get "more_fund_data"
        get "id"  
      end
      resources :portfolios, only: [:index]
      resources :competitions, only: [:index,:create] do
        resources :portfolios, only: [:show,:create] do
          resources :stocks, only: [:index, :create]
        end
      end
    end
  end
end
