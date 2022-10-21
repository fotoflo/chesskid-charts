import React from "react";
import styled from "styled-components";

import { OpponentData } from "components/helpers/processRatingData.ts";
import Loading from "components/Loading";

type Props = {
  opponents: OpponentData[];
};

const OpponentList = ({ opponents }: Props) => {
  if (!opponents) {
    return <p> {`No games in this date range`} </p>;
  }

  return (
    <ul>
      {opponents.map((opponent) => {
        return (
          <OpponentItem key={opponent.username}>
            <a
              href={`https://www.chesskid.com/user/${opponent.username}/profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={opponent.avatarUrl} height={"50px"} />
            </a>
            <span> &nbsp; </span>
            <a
              href={`https://www.chesskid.com/user/${opponent.username}/profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{opponent.username}</span>
            </a>
            <span>&nbsp; ({opponent.rating})</span>
            <span>&nbsp; W: {opponent.games.wins}&nbsp;</span>
            <span>L: {opponent.games.losses}&nbsp;</span>
            <span>D: {opponent.games.draws}</span>
          </OpponentItem>
        );
      })}
    </ul>
  );
};

const OpponentItem = styled.li`
  margin-top: 10px;
  border: 1px solid grey;
  padding: 2px;
`;

export default OpponentList;
