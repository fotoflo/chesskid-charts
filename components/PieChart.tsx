import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ data }) {
  return (
    <ChartContainer>
      <Pie data={data} />
    </ChartContainer>
  );
}

const ChartContainer = styled(Container)`
  width: 15em;
`;
