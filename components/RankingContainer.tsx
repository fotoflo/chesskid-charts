import React, { useState } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

// import processRankingData from "components/helpers/processRankingData";

type Props = {};

const RankingContainer = (props: Props) => {
  // const data = processRankingData(props.data);

  const sampleData = [
    {
      date: "2019-12-25",
      userGain: 80000,
    },
    {
      date: "2019-12-26",
      userGain: 100000,
    },
    {
      date: "2019-12-27",
      userGain: 120000,
    },
    {
      date: "2020-06-01",
      userGain: 100000,
    },
    {
      date: "2020-12-27",
      userGain: 120000,
    },
  ];

  const [LineChartData, setLineChartData] = useState({
    datasets: [
      {
        label: "User Gain",
        data: sampleData.map((item) => {
          return {
            x: item.date,
            y: item.userGain,
          };
        }),
      },
    ],
  });

  return (
    <Container>
      <p>ranking data</p>
      <LineChart chartData={LineChartData} />
      {/* <p>{JSON.stringify(data)}</p> */}
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

export default RankingContainer;
