import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import GameOdds from "./GameOdds";

const ScoreContainer = styled.div`
  margin-bottom: 10px;
`;

const SetOdds = props => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    axios("/api/get-odds").then(function(res) {
      setGames(res.data);
    });
  }

  function mapGames() {
    return games.map(game => {
      return (
        <ScoreContainer>
          <GameOdds
            id={game.game_id}
            awayTeam={game.away_team}
            homeTeam={game.home_team}
            line={game.line}
          />
        </ScoreContainer>
      );
    });
  }
  return <div>{mapGames()}</div>;
};

export default SetOdds;
