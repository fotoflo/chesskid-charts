import React, { useState, useReducer } from "react";
import styled from "styled-components";

import Loading from "./Loading";

import { DateRangeInput } from "@datepicker-react/styled";
import { processRatingData } from "./helpers/processRatingData";

import LineChart from "./LineChart";
import { PieChart } from "./PieChart";

type Props = {};

const RatingContainer = ({ fullData }) => {
  if (!fullData) {
    return <Loading />;
  }

  console.log("full data length", fullData.items.length);

  const initialStartDate = new Date(
    new Date("2021-09-25").setHours(0, 0, 0, 0)
  );

  const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0));

  const initialData = processRatingData(
    fullData,
    initialStartDate,
    initialEndDate
  );

  const initialState = {
    focusedInput: null,
    ...initialData,
  };

  function stateReducer(state, action) {
    switch (action.type) {
      case "focusChange":
        return { ...state, focusedInput: action.payload };

      case "dateChange":
        const { endDate, focusedInput, startDate } = action.payload;
        const processedData = processRatingData(fullData, startDate, endDate);

        return {
          focusedInput,
          ...processedData,
        };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <Container>
      <p>Line Chart data from {state.lineChartData.datasets[0].data.length} </p>
      <p> Props data from {fullData.items.length} games</p>

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

      <p>start: {JSON.stringify(state.startDate)}</p>
      <p>end: {JSON.stringify(state.endDate)}</p>
      <br />
      <LineChart chartData={state.lineChartData} />
      <PieChart data={state.pieChartData} />
    </Container>
  );
};

const Container = styled.div`
  width: 700px;
  // center the content
  margin: 0 auto;
  padding: 1em;
  word-wrap: break-word;
`;

export default RatingContainer;
