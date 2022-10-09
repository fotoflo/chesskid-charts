import React from "react";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement);

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

  return <Line data={chartData} options={options} />;
}
