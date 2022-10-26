import React from "react";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import useWindowSize from "hooks/useWindowSize";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip);

export default function LineChart({ chartData }: Props) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: false,
    response: true,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  const { height, width } = useWindowSize();

  return (
    <LineChartCointainer height={height}>
      <Line data={chartData} options={options} />
    </LineChartCointainer>
  );
}

const LineChartCointainer = styled(Container)`
  padding-left: 1em;
  padding-right: 1em;
  height: ${(props) => props.height - 160}px;
`;
