import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Switch from "react-switch";

const Score = styled.span`
  margin: 10px;
`;

const ScoreContainer = styled.div`
  margin-bottom: 10px;
`;

const Spread = styled.input`
  width: 30px;
`;

const Pick = styled(Switch)`
  width: 40px;
`;

const App = props => {
  const [games, setGames] = useState([]);
  const [spreads, setSpreads] = useState({});

  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    axios("/api/get-games").then(function(res) {
      setGames(res.data);
    });
  }

  function handleSpreadChange(e, id) {
    setSpreads({ ...spreads, [id]: e.target.value });
  }

  function mapGames() {
    return games.map(game => {
      return (
        <ScoreContainer>
          <Score>
            {game.away_team}:&nbsp;
            {game.away_score}
          </Score>
          <Score>
            {game.home_team}:&nbsp;
            {game.home_score}
          </Score>
          <Spread
            onChange={e => handleSpreadChange(e, game.game_id)}
            value={spreads[game.game_id]}
          />
          <Pick
            uncheckedIcon={false}
            checkedIcon={false}
            checked={true}
            onChange={() => togglePick}
            handleDiameter={15}
            width={35}
            height={20}
          />
        </ScoreContainer>
      );
    });
  }

  return <div>{mapGames()}</div>;
};
export default App;
