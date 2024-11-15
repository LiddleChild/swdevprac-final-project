"use client";

import DateReserve from "@/components/DateReserve";
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useReducer } from "react";

type BookingFormAction = {
  name: string;
  payload: string;
};

export default function BookingPage() {
  const reducer = (state: BookingItem, action: BookingFormAction) => {
    return {
      ...state,
      [action.name]: action.payload,
    };
  };

  const [form, setForm] = useReducer(reducer, {
    name: "",
    surname: "",
    id: "",
    hospital: "Chulalongkorn Hospital",
    bookDate: "",
  });

  const textFieldHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      name: evt.target.name,
      payload: evt.target.value,
    });
  };

  const selectHandler = (evt: SelectChangeEvent) => {
    setForm({
      name: evt.target.name,
      payload: evt.target.value,
    });
  };

  const datePickerHandler = (value: Dayjs | null) => {
    setForm({
      name: "bookDate",
      payload: value?.format("YYYY/MM/DD") ?? "",
    });
  };

  return (
    <div className="flex justify-center items-center size-full">
      <div className="flex flex-col gap-4 w-full max-w-[512px] mx-4">
        <div className="text-4xl font-medium mb-4">Vaccine Booking</div>
        <form className="flex flex-col gap-6 w-full">
          <TextField
            label="Name"
            name="name"
            variant="standard"
            onChange={textFieldHandler}
            value={form["name"]}
          />
          <TextField
            label="Lastname"
            name="surname"
            variant="standard"
            onChange={textFieldHandler}
            value={form["surname"]}
          />
          <TextField label="Citizen ID" name="id" variant="standard" onChange={textFieldHandler} />
          <Select
            variant="standard"
            name="hospital"
            onChange={selectHandler}
            value={form["hospital"]}
          >
            <MenuItem value="Chulalongkorn Hospital">Chulalongkorn Hospital</MenuItem>
            <MenuItem value="Rajavithi Hospital">Rajavithi Hospital</MenuItem>
            <MenuItem value="Thammasat University Hospital">Thammasat University Hospital</MenuItem>
          </Select>
          <DateReserve value={dayjs(form["bookDate"])} onChange={datePickerHandler} />
          <Button name="Book Vaccine" variant="contained" onClick={() => console.log("submit")}>
            Book Vaccine
          </Button>
        </form>
      </div>
    </div>
  );
}
