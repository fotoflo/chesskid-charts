import React from "react";
import Image from "next/image";
import styled from "styled-components";

type Props = {};

const OpponentList = ({ opponents }) => {
  return (
    <>
      <>
        {/* // hydration error */}
        {opponents.map(
          (
            opponent // causes hydration error
          ) => (
            <OpponentItem key={opponent.id}>
              <a
                href={`https://www.chesskid.com/user/${opponent.username}/profile`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={opponent.avatarUrl} height={"50px"} />
                <span>&nbsp; {opponent.username} &nbsp;- &nbsp;</span>
                <span>Rating: {opponent.rating} &nbsp;- &nbsp;</span>
                <span>Games: {opponent.games.count} - </span>
                <span>Wins: {opponent.games.wins}&nbsp;| </span>
                <span>Losses: {opponent.games.losses}&nbsp;| </span>
                <span>Draws: {opponent.games.draws}</span>
              </a>
            </OpponentItem>
          )
        )}
      </>
    </>
  );
};

const OpponentItem = styled.div`
  margin-top: 10px;
  border: 1px solid grey;
  padding: 2px;
`;

export default OpponentList;
