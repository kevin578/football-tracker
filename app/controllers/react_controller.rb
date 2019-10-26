# http://www.nfl.com/feeds-rs/scores/YEAR/TYPE/WEEK.json
# http://www.nfl.com/feeds-rs/scores/2018/REG/7.json
# Type can be PRE, REG, or POST

class ReactController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
  end

  def get_games
    response = HTTParty.get('http://www.nfl.com/liveupdate/scores/scores.json')
    #odds = Odd.where(week: "6")
    newRes = response.map do |game| 
      gameOdds = Odd.find_by(game_id: game[0])
      # if (gameOdds)
      #   gameOdds = gameOdds["line"]
      # end
      {
        game_id: game[0],
        home_score: game[1]["home"]["score"]["T"],
        home_team:  game[1]["home"]["abbr"],
        away_score: game[1]["away"]["score"]["T"],
        away_team:  game[1]["away"]["abbr"],
        line: gameOdds
      }
    end

    render json: newRes
  end

  def get_game_odds 
    response = HTTParty.get('http://www.nfl.com/liveupdate/scores/scores.json')
  
    game_odds = response.map do |game|
  
      line_in_database = Odd.find_by(game_id: game[0])
      if (line_in_database)
        line_in_database = line_in_database["line"]
      else 
        line_in_database = 0
      end
      {
        game_id: game[0],
        home_team:  game[1]["home"]["abbr"],
        away_team:  game[1]["away"]["abbr"],
        line: line_in_database
      }
    end
    render json: game_odds
  end

  def set_odds
    game_id = params[:game_id]
    line = params[:line]
    game = Odd.find_by(game_id: game_id)
    if game
      game.destroy
    end

    Odd.create(game_id: game_id, line: line)

    render json: { success: "Gave a #{line} point spread to game #{game_id}" }
  end

  def get_odds
  end  

end
