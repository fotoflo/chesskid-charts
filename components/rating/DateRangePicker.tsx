import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Container, Row } from "react-bootstrap";

type Props = {};

const DateRangePickerComponent = ({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChangeStartDate,
  onChangeEndDate,
}) => {
  return (
    <>
      <DatePickerContainer>
        <Row>
          <Col md={12}>
            <StyledDatePicker
              selectsStart
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={onChangeStartDate}
            />

            <StyledDatePicker
              selectsEnd
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={onChangeEndDate}
            />
          </Col>
        </Row>
      </DatePickerContainer>
    </>
  );
};

const DatePickerContainer = styled(Container).attrs({
  className: "flex-row",
})`
  border: 4px solid purple;
`;

const StyledDatePicker = styled(DatePicker).attrs({
  className: "p-1",
})`
  display: inline;
  border: 2px solid red;
  width: 105px;
`;

export default DateRangePickerComponent;
