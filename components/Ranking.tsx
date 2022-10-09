import React from "react";
import styled from "styled-components";

type Props = {};

const Ranking = (props: Props) => {
  return (
    <div>
      <p>ranking data</p>
      <Data>{JSON.stringify(props.data)}</Data>
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
