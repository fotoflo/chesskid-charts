import React, { useState, useReducer } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

import {
  flattenRatingData,
  composeLineChartData,
  filterByDate,
} from "components/helpers/processRatingData";
import Loading from "./Loading";
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
} from "@datepicker-react/styled";
import { processRatingData } from "./helpers/processRatingData";
import { PieChart } from "./PieChart";

type Props = {};

const RatingContainer = (props) => {
  if (!props.data) {
    return <Loading />;
  }

  const pieChartData = {
    labels: ["Win", "Lose", "Draw"],
    datasets: [
      {
        label: "Win/Lose/Draw",
        data: [10, 50, 100],
        backgroundColor: [
          "rgb(54, 235, 90)",
          "rgb(255, 86, 86)",
          "rgba(184, 184, 184, 0.155)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const initialStartDate = new Date(
    new Date("2022-09-25").setHours(0, 0, 0, 0)
  );

  const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0));

  function dateStateReducer(state, action) {
    switch (action.type) {
      case "focusChange":
        return { ...state, focusedInput: action.payload };
      case "dateChange":
        const { endDate, focusedInput, startDate } = action.payload;
        const lineChartState = processRatingData(
          props.data,
          startDate,
          endDate
        );

        return { lineChartState, endDate, focusedInput, startDate };
      default:
        throw new Error();
    }
  }

  const initialRatingData = flattenRatingData(props.data);

  const initialDateState = {
    startDate: initialStartDate,
    endDate: initialEndDate,
    focusedInput: null,
    lineChartState: composeLineChartData(initialRatingData),
  };

  const [state, dispatch] = useReducer(dateStateReducer, initialDateState);

  return (
    <Container>
      <p>
        Rating data from {state.lineChartState.datasets[0].data.length} games
      </p>

      <DateRangeInput
        onDatesChange={(dateData) =>
          dispatch({ type: "dateChange", payload: dateData })
        }
        onFocusChange={(focusedInput) =>
          dispatch({ type: "focusChange", payload: focusedInput })
        }
        startDate={state.startDate} // Date or null
        endDate={state.endDate} // Date or null
        focusedInput={state.focusedInput} // START_DATE, END_DATE or null
      />

      {/* <p>start: {JSON.stringify(state.startDate)}</p>
      <p>end: {JSON.stringify(state.endDate)}</p> */}
      <br />
      <LineChart chartData={state.lineChartState} />
      <PieChart data={pieChartData} />
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

export default RatingContainer;
