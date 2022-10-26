import React from "react";
import styled from "styled-components";

import { OpponentData } from "components/helpers/processRatingData.ts";

import { Container } from "react-bootstrap";
import useWindowSize from "hooks/useWindowSize";
import ButtonBar from "./ButtonBar";

type Props = {
  opponents: OpponentData[];
  sortType: "rating" | "gameCount";
  dispatch: () => void;
};

const buttonList = [
  {
    title: "Sort By",
    value: "sortBy",
    isVoid: true,
  },
  {
    title: "Rating",
    value: "rating",
  },
  {
    title: "Game Count",
    value: "gameCount",
  },
];

const OpponentList = ({ opponents, sortType, dispatch }: Props) => {
  const windowSize = useWindowSize();

  if (!opponents) {
    return <p> {`No games in this date range`} </p>;
  }

  return (
    <>
      <ButtonBar
        className={"mb-2"}
        dispatch={dispatch}
        dispatchType="toggleSortType"
        selectedValue={sortType}
        buttons={buttonList}
      />

      <ScrollContainer windowSize={windowSize}>
        <ul className="list-unstyled">
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
      </ScrollContainer>
    </>
  );
};

const OpponentItem = styled.li`
  margin-top: 10px;
  border: 1px solid grey;
  padding: 2px;
`;

const ScrollContainer = styled(Container)`
  overflow-y: scroll;
  height: ${(props) => {
    return props.windowSize.height - 500 + "px";
  }};
`;

export default OpponentList;
