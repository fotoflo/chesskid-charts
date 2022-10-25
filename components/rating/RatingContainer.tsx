import React, { useReducer } from "react";
import styled from "styled-components";

import { Button, Col, Container, Row } from "react-bootstrap";
import { DateRangeInput } from "@datepicker-react/styled";

import LineChart from "components/charts/LineChart";
import { PieChart } from "components/charts/PieChart";
import { processRatingData } from "components/helpers/processRatingData";
import OpponentList from "components/rating/OpponentList";

import { capitalizeFirstLetter } from "utils/stringUtils";
import ButtonBar from "./ButtonBar";

type Props = {};

export const toggleSortType = (sortType: "rating" | "gameCount") => {
  return sortType === "rating" ? "gameCount" : "rating";
};

export const toggleFilterColor = (filterColor: "all" | "white" | "black") => {
  switch (filterColor) {
    case "all":
      return "white";
    case "white":
      return "black";
    case "black":
      return "all";
  }
};

const RatingContainer = ({ fullData }) => {
  if (!fullData) {
    return;
  }

  const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0));
  const now = new Date();
  const backdate = new Date(now.setDate(now.getDate() - 30));
  const initialStartDate = new Date(new Date(backdate).setHours(0, 0, 0, 0));
  const firstDate = new Date(
    fullData.items[fullData.items.length - 1].finishDate * 1000
  );

  const initialOpponentSortType = "rating";

  const initialData = processRatingData(fullData, {
    startDate: initialStartDate,
    endDate: initialEndDate,
    opponentLimit: 10,
    opponentSortType: initialOpponentSortType,
    filterColor: "all",
  });

  const initialState = {
    ...initialData,
    focusedInput: null,
  };

  type RatingState = ReturnType<typeof initialData>;

  function stateReducer(state: RatingState, action) {
    let processedData;

    switch (action.type) {
      case "focusChange":
        return { ...state, focusedInput: action.payload };

      case "dateChange":
        const { endDate, startDate } = action.payload;

        return processRatingData(fullData, {
          ...state,
          startDate,
          endDate,
        });
      case "toggleSortType":
        return processRatingData(fullData, {
          ...state,
          opponentSortType: action.payload,
        });

      case "toggleFilterColor":
        return processRatingData(fullData, {
          ...state,
          filterColor: action.payload,
        });
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <ChartContainer fluid={true} className="mt-2">
      <Row>
        <Col md="9">
          <p>
            Games played in date range: &nbsp;
            {state.lineChartData.datasets[0].data.length}
            <br />
          </p>
          <LineChart chartData={state.lineChartData} />
        </Col>
        <Col md="3">
          <Row>
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
          </Row>
          <Row>
            <ButtonBar
              dispatch={dispatch}
              dispatchType="toggleFilterColor"
              selectedValue={state.filterColor}
              buttons={[
                {
                  title: "Played As",
                  value: "playedAs",
                  isVoid: true,
                },
                {
                  title: "All",
                  value: "all",
                },
                {
                  title: "White",
                  value: "white",
                },
                {
                  title: "Black",
                  value: "black",
                },
              ]}
            />
          </Row>
          <Row className="mt-4">
            <PieChart data={state.pieChartData} />
          </Row>
          <Row className="mt-4">
            <OpponentList
              opponents={state.topOpponents}
              sortType={state.opponentSortType}
              dispatch={dispatch}
            />
          </Row>
        </Col>
      </Row>
    </ChartContainer>
  );
};

const ChartContainer = styled(Container)`
  padding-left: 3em;
  padding-right: 3em;
  word-wrap: break-word;
`;

const MTRow = styled(Row)`
  margin-top: 5px;
`;

export default RatingContainer;
