import React, { useState, useReducer } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

import processRatingData, {
  composeLineChartData,
  filterByDate,
} from "components/helpers/processRatingData";
import Loading from "./Loading";
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
} from "@datepicker-react/styled";

type Props = {};

const RatingContainer = (props) => {
  if (!props.data) {
    return <Loading />;
  }

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
        const filteredData = filterByDate(props.data, startDate, endDate);
        const ratingData = processRatingData(filteredData, startDate, endDate);
        const lineChartState = composeLineChartData(ratingData);
        lineChartState.isRerender = true;

        return { lineChartState, endDate, focusedInput, startDate };
      default:
        throw new Error();
    }
  }

  const initialRatingData = processRatingData(
    props.data,
    initialStartDate,
    initialEndDate
  );

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

      <p>start: {JSON.stringify(state.startDate)}</p>
      <p>end: {JSON.stringify(state.endDate)}</p>
      <LineChart chartData={state.lineChartState} />
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
