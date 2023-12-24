# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    devise_scope :user do
      post "login", to: "sessions#create", as: "login"
      delete "logout", to: "sessions#destroy", as: "logout"
    end

    resources :users, only: [:show, :create, :update, :destroy], constraints: { id: /.*/ }
    resources :uploads, only: :create, controller: "chunks"
    resources :chats, only: [:index, :create, :show] do
      member do
        post :question
      end
    end
  end
end
