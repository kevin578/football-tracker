Rails.application.routes.draw do
  get 'react/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "react#index"
  post "api/set-odds", to: "react#set_odds"
  get "api/get-odds", to: "react#get_game_odds"

  get "set-odds", to: "react#get_odds"
end
