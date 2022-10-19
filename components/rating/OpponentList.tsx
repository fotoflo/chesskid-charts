import React from "react";
import Image from "next/image";
import styled from "styled-components";

type Props = {};

const OpponentList = ({ opponents }) => {
  return (
    <>
      {opponents.map((opponent) => (
        <OpponentItem key={opponent.username}>
          <img src={opponent.avatarUrl} height={"50px"} />
          <span>&nbsp; {opponent.username} &nbsp;- &nbsp;</span>
          <span>Rating: {opponent.rating} &nbsp;- &nbsp;</span>
          <span>Games: {opponent.games.count} - </span>
          <span>Wins: {opponent.games.wins}&nbsp;| </span>
          <span>Losses: {opponent.games.losses}&nbsp;| </span>
          <span>Draws: {opponent.games.draws}</span>
        </OpponentItem>
      ))}
    </>
  );
};

const OpponentItem = styled.div`
  margin-top: 10px;
  border: 1px solid grey;
  padding: 2px;
`;

export default OpponentList;
