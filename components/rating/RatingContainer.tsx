import React, { useReducer } from "react";
import styled from "styled-components";

import { Col, Container, Row } from "react-bootstrap";

import LineChart from "components/charts/LineChart";
import { PieChart } from "components/charts/PieChart";
import { processRatingData } from "components/helpers/processRatingData";
import OpponentList from "components/rating/OpponentList";

import ButtonBar from "./ButtonBar";
import DateRangePicker from "./DateRangePicker";

type Props = {};

const RatingContainer = ({ fullData }) => {
  if (!fullData) {
    return;
  }

  const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
  const now = new Date();
  const backdate = new Date(now.setDate(now.getDate() - 30));
  const initialStartDate = new Date(new Date(backdate).setHours(0, 0, 0, 0));
  const minDate = new Date(
    fullData.items[fullData.items.length - 1].finishDate * 1000
  );

  const initialOpponentSortType = "rating";

  const initialData = processRatingData(fullData, {
    startDate: initialStartDate,
    endDate: maxDate,
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
    switch (action.type) {
      case "startDateChange":
        return processRatingData(fullData, {
          ...state,
          startDate: action.payload,
        });
      case "endDateChange":
        return processRatingData(fullData, {
          ...state,
          endDate: action.payload,
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
            <Col>
              <DateRangePicker
                startDate={state.startDate}
                endDate={state.endDate}
                minDate={minDate}
                maxDate={maxDate}
                onChangeStartDate={(newStartDate) => {
                  dispatch({
                    type: "startDateChange",
                    payload: newStartDate,
                  });
                }}
                onChangeEndDate={(newEndDate) => {
                  dispatch({
                    type: "endDateChange",
                    payload: newEndDate,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-2">
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
            </Col>
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

const DateContainer = styled(Container)`
  z-index: 1;
  margin-top: 5px;
`;

export default RatingContainer;
