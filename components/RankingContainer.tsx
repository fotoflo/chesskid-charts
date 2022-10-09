import React, { useState } from "react";
import styled from "styled-components";

import { Chart as ChartJS, BarElement } from "chart.js";

import LineChart from "./LineChart";
import "chartjs-adapter-date-fns";

import processRankingData from "components/helpers/processRankingData";

ChartJS.register(BarElement);

type Props = {};

const RankingContainer = (props: Props) => {
  const data = processRankingData(props.data);

  const sampleData = [
    {
      id: 1,
      date: "2019-01-01",
      userGain: 80000,
      userLost: 20000,
    },
    {
      id: 2,
      date: "2019-01-02",
      userGain: 100000,
      userLost: 50000,
    },
    {
      id: 3,
      date: "2019-01-03",
      userGain: 120000,
      userLost: 100000,
    },
  ];

  const [LineChartData, setLineChartData] = useState({
    labels: sampleData.map((item) => {
      item.date;
    }),
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

  const config = {
    type: "line",
    data: LineChartData,
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Container>
      <p>ranking data</p>
      <LineChart chartData={LineChartData} config={config} />
      <p>{JSON.stringify(data)}</p>
    </Container>
  );
};

const Container = styled("div")`
  max-width: 700px;
  // center the content
  margin: 0 auto;
  padding: 1em;
  word-wrap: break-word;
`;

export default RankingContainer;
