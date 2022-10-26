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
        <StyledDatePicker
          selectsStart
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChangeStartDate}
        />
        <span>➡</span>
        <StyledDatePicker
          selectsEnd
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChangeEndDate}
        />
      </DatePickerContainer>
    </>
  );
};

const DatePickerContainer = styled(Container).attrs({
  className: "d-flex flex-row justify-content-center align-items-center",
})`
  padding: 0;
  margin: 0;
`;

const StyledDatePicker = styled(DatePicker).attrs({
  className: "p-1",
})`
  width: 105px;
`;

export default DateRangePickerComponent;
