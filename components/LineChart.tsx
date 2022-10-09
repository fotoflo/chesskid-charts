import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

type Props = {
  chartData: object;
  config: object;
};

Chart.register(CategoryScale);

export default function LineChart({ chartData, config }: Props) {
  return <Line data={chartData} config={config} />;
}
