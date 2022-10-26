import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosCalendar } from "react-icons/io";

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
      <DateRangePickerContainer>
        <DatePickerContainer>
          <IoIosCalendar />
          <StyledDatePicker
            selectsStart
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={onChangeStartDate}
          />
        </DatePickerContainer>
        <Arrow>➡</Arrow>
        <DatePickerContainer>
          <IoIosCalendar />
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
      </DateRangePickerContainer>
    </>
  );
};

const DateRangePickerContainer = styled(Container).attrs({
  className: "d-flex flex-row justify-content-center align-items-center",
})`
  padding: 0;
  margin: 0;
`;

const Arrow = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const DatePickerContainer = styled.span.attrs({
  className: "d-flex flex-row justify-content-center align-items-center",
})`
  padding: 0px 10px;
  border: 1px solid #ced4da;
`;

const StyledDatePicker = styled(DatePicker).attrs({
  className: "p-1",
})`
  border: none;
  width: 105px;
`;

export default DateRangePickerComponent;
