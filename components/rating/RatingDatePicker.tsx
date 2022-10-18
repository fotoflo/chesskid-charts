import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
} from "@datepicker-react/styled";
import { date } from "zod";

type Props = {
  state: object;
  onDatesChange: Function;
  dispatch: Function;
};

export default function RatingDatePicker({ state, onDatesChange }: Props) {
  return (
    <DateRangeInput
      onDatesChange={onDatesChange}
      onFocusChange={onDatesChange}
      startDate={state.startDate} // Date or null
      endDate={state.endDate} // Date or null
      focusedInput={state.focusedInput} // START_DATE, END_DATE or null
    />
  );
}
