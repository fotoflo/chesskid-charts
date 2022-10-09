import React from "react";

type Props = {};

const Ranking = (props: Props) => {
  return (
    <div>
      <p>ranking data</p>
      <p>{JSON.stringify(props.data)}</p>
      <p>ranking data</p>
    </div>
  );
};

export default Ranking;
