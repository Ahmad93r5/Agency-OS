Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

    resources :workspaces, only: [ :index, :show, :update, :destroy ]
    post "/signup", to: "authentication#signup"
    post "/login", to: "authentication#login"
    get "/users", to: "users#index"
    post "/workspaces", to: "workspaces#create"

    resources :workspaces do
     resources :clients, only: [ :index, :show, :create, :update, :destroy ]
    end
        #Route for client notes
     resources :workspaces do
    resources :clients do
      resources :notes, only: [:index, :create]  
    end
  end

end
