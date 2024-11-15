"use client";

import { DatePicker, LocalizationProvider, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

type DateReserveProps = {
  value?: Dayjs;
  onChange?: (value: Dayjs | null) => void;
};

export default function DateReserve({ value, onChange }: DateReserveProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}
