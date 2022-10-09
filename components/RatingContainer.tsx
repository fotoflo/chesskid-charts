import React, { useState } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

import processRankingData from "components/helpers/processRankingData";

type Props = {};

const RaitingContainer = (props: Props) => {
  const data = processRankingData(props.data);

  const [LineChartData, setLineChartData] = useState({
    datasets: [
      {
        label: "User Gain",
        data: data.map((item) => {
          return {
            x: item.finishDate.toISOString().split("T")[0],
            y: item.rating,
          };
        }),
      },
    ],
  });

  console.log("final data", LineChartData);

  return (
    <Container>
      <p>Rating data</p>
      <LineChart chartData={LineChartData} />
    </Container>
  );
};

const Container = styled("div")`
  width: 700px;
  // center the content
  margin: 0 auto;
  padding: 1em;
  word-wrap: break-word;
`;

export default RaitingContainer;
