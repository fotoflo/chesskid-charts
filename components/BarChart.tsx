import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

type Props = {
  chartData: object;
};

Chart.register(CategoryScale);

export default function BarChart({ chartData }: Props) {
  return <Bar data={chartData} />;
}
