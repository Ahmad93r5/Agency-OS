Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  get "up" => "rails/health#show", as: :rails_health_check

  # Auth
  post "/signup", to: "authentication#signup"
  post "/login", to: "authentication#login"
  get "/users", to: "users#index"

  get "/clients", to: "clients#all_clients"
  get    "profile",         to: "users#show"
  patch  "profile",         to: "users#update"
  patch  "change_password", to: "users#change_password"


  resources :workspaces do
    resources :clients do
      member do
        get :briefings
      end

      resources :notes, only: [ :index, :create, :update, :destroy ] do
        collection do
          post :generate_briefing
        end
      end
    end
  end
end
