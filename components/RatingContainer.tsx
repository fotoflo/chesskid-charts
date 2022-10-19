import React, { useState, useReducer } from "react";
import styled from "styled-components";

import LineChart from "./LineChart";

import processRatingData, {
  composeLineChartData,
} from "components/helpers/processRatingData";
import Loading from "./Loading";
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
} from "@datepicker-react/styled";
import { RatingData } from "./helpers/processRatingData";

type Props = {};

const RatingContainer = ({ data }) => {
  if (!data) {
    return <Loading />;
  }

  const initialStartDate = new Date(
    new Date("2022-09-25").setHours(0, 0, 0, 0)
  );

  const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0));

  const initialDateState = {
    startDate: initialStartDate,
    endDate: initialEndDate,
    focusedInput: null,
  };
  const [dateState, dispatch] = useReducer(reducer, initialDateState);

  const initialRatingData = processRatingData(
    data,
    initialStartDate,
    initialEndDate
  );

  function reducer(state, action) {
    switch (action.type) {
      case "focusChange":
        return { ...state, focusedInput: action.payload };
      case "dateChange":
        console.log("payload", action.payload);
        return action.payload;
      default:
        throw new Error();
    }
  }

  const [LineChartData, setLineChartData] = useState(
    composeLineChartData(initialRatingData)
  );

  return (
    <Container>
      <p>Rating data from {LineChartData.datasets[0].data.length} games</p>

      <DateRangeInput
        onDatesChange={(data) =>
          dispatch({ type: "dateChange", payload: data })
        }
        onFocusChange={(focusedInput) =>
          dispatch({ type: "focusChange", payload: focusedInput })
        }
        startDate={dateState.startDate} // Date or null
        endDate={dateState.endDate} // Date or null
        focusedInput={dateState.focusedInput} // START_DATE, END_DATE or null
      />

      <p>start: {JSON.stringify(dateState.startDate)}</p>
      <p>end: {JSON.stringify(dateState.endDate)}</p>
      <LineChart chartData={LineChartData} />
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
