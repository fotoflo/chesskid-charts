import React from "react";
import styled from "styled-components";

import processRankingData from "components/helpers/processRankingData";

type Props = {};

const Ranking = (props: Props) => {
  const data = processRankingData(props.data);

  return (
    <div>
      <p>ranking data</p>
      <Data>{JSON.stringify(data)}</Data>
      <p>ranking data</p>
    </div>
  );
};

const Data = styled("p")`
  max-width: 700px;
  // center the content
  margin: 0 auto;
  padding: 1em;
  word-wrap: break-word;
`;

export default Ranking;
