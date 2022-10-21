import React, { useState, useReducer } from "react";
import styled from "styled-components";

import { Col, Container, Row } from "react-bootstrap";
import { DateRangeInput } from "@datepicker-react/styled";

import LineChart from "components/charts/LineChart";
import { PieChart } from "components/charts/PieChart";
import { processRatingData } from "components/helpers/processRatingData";
import OpponentList from "components/rating/OpponentList";

type Props = {};

const RatingContainer = ({ fullData }) => {
  if (!fullData) {
    return;
  }

  const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0));
  const now = new Date();
  const backdate = new Date(now.setDate(now.getDate() - 30));
  const initialStartDate = new Date(backdate).setHours(0, 0, 0, 0);
  const firstDate = new Date(
    fullData.items[fullData.items.length - 1].finishDate * 1000
  );

  const initialData = processRatingData(
    fullData,
    initialStartDate,
    initialEndDate
  );

  const initialState = {
    ...initialData,
    focusedInput: null,
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
    <ChartContainer fluid>
      <Row>
        <Col md="12">
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
            minBookingDate={firstDate}
            maxBookingDate={initialEndDate}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p> Total Games Played: {fullData.items.length}</p>
          <p>
            Games played in date range: &nbsp;
            {state.lineChartData.datasets[0].data.length}
            <br />
          </p>
          <OpponentList opponents={state.topOpponents} />
        </Col>
        <Col md="6">
          <PieChart data={state.pieChartData} />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <LineChart chartData={state.lineChartData} />
        </Col>
      </Row>
    </ChartContainer>
  );
};

const ChartContainer = styled(Container)`
  // center the content
  margin: 0 auto;
  padding: 1em;
  word-wrap: break-word;
`;

export default RatingContainer;
