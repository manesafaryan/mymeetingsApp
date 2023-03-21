import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";

interface IProps {
  handleValue: (value: DateRange<string | null>) => void;
}

const DatePicker: React.FunctionComponent<IProps> = ({ handleValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          onChange={handleValue}
          localeText={{ start: "Start", end: "End" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
