import React from "react";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ chartData }: Props) {
  const options = {
    response: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  console.log("chartData", chartData);
  console.log("options", options);

  return <Line data={chartData} options={options} />;
}
