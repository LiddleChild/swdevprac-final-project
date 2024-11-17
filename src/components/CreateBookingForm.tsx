"use client";

import createBooking from "@/libs/createBooking";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type CreateBookingFormProps = {
  dentists: DentistItem[];
};

export default function CreateBookingForm({ dentists }: CreateBookingFormProps) {
  const session = useSession();
  const router = useRouter();

  const [dentist, setDentist] = useState<string | undefined>("");
  const [date, setDate] = useState<Dayjs>(dayjs(Date.now()));
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session.data) {
      router.push("/login");
      return;
    }

    if (!dentist) {
      setError("Please select dentist");
      return;
    }

    toast.promise(
      createBooking(session.data, dentist, date.toDate().toISOString().replace(/T.*/, "")),
      {
        loading: "Creating booking...",
        success: () => {
          router.push("/mybooking");
          router.refresh();
          return "Created!";
        },
        error: (err) => err.message,
      }
    );
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
      <div className="text-red-700 w-full text-left">{error}</div>
      <div className="text-lg">Dentist</div>
      <Select
        className="w-full"
        value={dentist}
        onChange={(event: SelectChangeEvent) => setDentist(event.target.value)}
        displayEmpty
      >
        {dentists.map((dentist) => (
          <MenuItem value={dentist._id} key={dentist._id}>
            {dentist.name}
          </MenuItem>
        ))}
      </Select>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={date}
          onChange={(date) => setDate(date!)}
          slotProps={{ actionBar: { actions: [] } }}
        />
      </LocalizationProvider>
      <button
        className="w-full px-3 py-2 text-white rounded-lg bg-ci-green border border-transparent
            focus:outline-none focus:border-black
            disabled:bg-opacity-50"
      >
        Create booking
      </button>
    </form>
  );
}
