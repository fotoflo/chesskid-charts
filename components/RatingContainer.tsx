import React, { useState } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

import processRatingData from "components/helpers/processRatingData";

type Props = {};

const RatingContainer = (props: Props) => {
  const data = processRatingData(props.data);

  const [LineChartData, setLineChartData] = useState({
    datasets: [
      {
        label: "rating",
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

export default RatingContainer;
