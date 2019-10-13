# http://www.nfl.com/feeds-rs/scores/YEAR/TYPE/WEEK.json
# http://www.nfl.com/feeds-rs/scores/2018/REG/7.json
# Type can be PRE, REG, or POST

class ReactController < ApplicationController
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



end
