import React, { useEffect } from "react";
import styled from "styled-components";

import { OpponentData } from "components/helpers/processRatingData.ts";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { capitalizeFirstLetter } from "utils/stringUtils";
import { toggleSortType } from "./RatingContainer";
import { Container } from "react-bootstrap";
import useWindowSize from "hooks/useWindowSize";

type Props = {
  opponents: OpponentData[];
  sortType: "rating" | "gameCount";
  dispatch: () => void;
};

const OpponentList = ({ opponents, sortType, dispatch }: Props) => {
  if (!opponents) {
    return <p> {`No games in this date range`} </p>;
  }

  const windowSize = useWindowSize();

  const getButtonVariant = (
    sortType: "rating" | "gameCount",
    buttonName: "rating" | "gameCount"
  ) => {
    if (sortType === buttonName) {
      return "primary";
    }
    return "secondary";
  };

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button variant="light">Sort By: </Button>
        <Button
          variant={getButtonVariant(sortType, "rating")}
          onClick={() =>
            dispatch({ type: "toggleSortType", payload: "rating" })
          }
        >
          Rating
        </Button>
        <Button
          variant={getButtonVariant(sortType, "gameCount")}
          onClick={() =>
            dispatch({ type: "toggleSortType", payload: "gameCount" })
          }
        >
          Game Count
        </Button>
      </ButtonGroup>
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
    return props.windowSize.height - 450 + "px";
  }};
  border-bottom: 2px solid grey;
`;

export default OpponentList;
