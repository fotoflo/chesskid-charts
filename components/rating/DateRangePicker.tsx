import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {};

const DateRangePickerComponent = ({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChangeStartDate,
  onChangeEndDate,
  className,
}) => {
  return (
    <>
      <DatePicker
        wrapperClassName={className}
        selected={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChangeStartDate}
      />

      <DatePicker
        wrapperClassName={className}
        minDate={minDate}
        maxDate={maxDate}
        selected={endDate}
        onChange={onChangeEndDate}
      />
    </>
  );
};

export default DateRangePickerComponent;
