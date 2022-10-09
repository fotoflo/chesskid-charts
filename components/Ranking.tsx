import React, { useState } from "react";
import styled from "styled-components";

import { Chart as ChartJS, BarElement } from "chart.js";

import LineChart from "./LineChart";

import processRankingData from "components/helpers/processRankingData";

ChartJS.register(BarElement);

type Props = {};

const Ranking = (props: Props) => {
  const data = processRankingData(props.data);

  const sampleData = [
    {
      id: 1,
      year: 2019,
      userGain: 80000,
      userLost: 20000,
    },
    {
      id: 2,
      year: 2020,
      userGain: 100000,
      userLost: 50000,
    },
    {
      id: 3,
      year: 2021,
      userGain: 120000,
      userLost: 100000,
    },
  ];

  const [LineChartData, setLineChartData] = useState({
    labels: sampleData.map((item) => item.year),
    datasets: [
      {
        label: "User Gain",
        data: sampleData.map((item) => item.userGain),
      },
    ],
  });

  return (
    <div>
      <p>ranking data</p>
      {/* <Data>{JSON.stringify(data)}</Data> */}
      <LineChart chartData={LineChartData} />
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
