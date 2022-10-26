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
import { withTheme } from "styled-components";
import styled from "styled-components";
import useWindowSize from "hooks/useWindowSize";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip);

const LineChart = ({ chartData, theme }) => {
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
      y: {
        ticks: {
          color: theme.fontColor,
        },
        grid: {
          color: theme.grey,
        },
      },
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          color: theme.fontColor,
        },
        grid: {
          display: false,
        },
      },
    },
    borderColor: theme.grey,
    elements: {
      point: {
        pointBorderColor: theme.standout,
        radius: 2,
        borderWidth: 6,
        hoverRadius: 5,
      },
      line: {
        borderColor: theme.fontColor,
      },
    },
  };

  const { height } = useWindowSize();

  return (
    <LineChartCointainer height={height}>
      <Line data={chartData} options={options} />
    </LineChartCointainer>
  );
};

export default withTheme(LineChart);

const LineChartCointainer = styled(Container)`
  padding-left: 1em;
  padding-right: 1em;
  height: ${(props) => props.height - 160}px;
`;
