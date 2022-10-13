import React, { useState } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

import processRatingData from "components/helpers/processRatingData";
import Loading from "./Loading";

type Props = {};

const RatingContainer = ({ data }) => {
  if (!data) {
    return <Loading />;
  }
  const ratingData = processRatingData(data);

  const [LineChartData, setLineChartData] = useState({
    datasets: [
      {
        label: "rating",
        data: ratingData.map((item) => {
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
      <p>Rating data from {LineChartData.datasets[0].data.length} games</p>
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
