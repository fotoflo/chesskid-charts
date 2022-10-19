import React, { useState, useReducer } from "react";
import styled from "styled-components";

import Loading from "./Loading";

import { DateRangeInput } from "@datepicker-react/styled";
import { processRatingData } from "./helpers/processRatingData";

import LineChart from "./LineChart";
import { PieChart } from "./PieChart";
import { Col, Row } from "react-bootstrap";

type Props = {};

const RatingContainer = ({ fullData }) => {
  if (!fullData) {
    return;
  }

  console.log("full data length", fullData.items.length);

  const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0));
  const now = new Date(new Date().setHours(0, 0, 0, 0));
  const initialStartDate = new Date(now.setDate(now.getDate() - 30));

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

      <br />
      <Row>
        <Col md="2">
          <PieChart data={state.pieChartData} />
        </Col>
      </Row>
      <LineChart chartData={state.lineChartData} />
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
