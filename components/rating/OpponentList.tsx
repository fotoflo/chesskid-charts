import React from "react";
import styled from "styled-components";

import { OpponentData } from "components/helpers/processRatingData.ts";

type Props = {
  opponents: OpponentData[];
};

const OpponentList = ({ opponents }: Props) => {
  return (
    <ul>
      <p>{JSON.stringify(opponents)}</p>
      {opponents.map((opponent) => {
        return <li key={opponent.username}>{opponent.username}</li>;
      })}
    </ul>
  );
};

const OpponentItem = styled.div`
  margin-top: 10px;
  border: 1px solid grey;
  padding: 2px;
`;

export default OpponentList;
