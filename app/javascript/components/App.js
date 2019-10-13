import React, {useEffect, useState} from "react";
import { get } from "https";

const App = props => {
  
  const [games, setGames] = useState([]);

  useEffect(()=> {
    getGames();
  }, [])
  
  function getGames() {
    fetch("/api/get-games")
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        setGames(data)
      });
  }

  function mapGames() {
    return games.map((game)=> {
      return (
      <div>
      <p>{game.away_team}: {game.away_score}</p>
      <p>{game.home_team}: {game.home_score}</p>
      </div>
      )
    })
  }

  return <div>{mapGames()}</div>;
};
export default App;
