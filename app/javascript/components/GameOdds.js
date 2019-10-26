import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Game = styled.div`
  margin: 10px;
`;

const Teams = styled.span`
  display: inline-block;
  width: 100px;
`;

const LineInput = styled.input`
  width: 30px;
`;

const GameOdds = props => {
  const [line, setLine] = useState("");

  useEffect(() => {
    setLine(props.line);
  }, []);

  function handleInputChange(e) {
    const { value } = e.target;
    setLine(value);
    axios.post("/api/set-odds", {
      game_id: props.id,
      line: value
    });
  }

  return (
    <Game>
      <Teams>
        {props.awayTeam} vs {props.homeTeam}
      </Teams>
      <LineInput value={line} onChange={handleInputChange} />
    </Game>
  );
};

export default GameOdds;

{
  /* 
          <Spread
            onChange={e => handleSpreadChange(e, game.game_id)}
            value={spreads[game.game_id]}
          /> */
}
