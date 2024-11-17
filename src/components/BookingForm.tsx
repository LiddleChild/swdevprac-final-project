"use client";

import createBooking from "@/libs/createBooking";
import updateBooking from "@/libs/updateBooking";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type BookingFormProps = {
  dentists: DentistItem[];
  booking?: BookingItem;
};

export default function BookingForm({ dentists, booking }: BookingFormProps) {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [dentist, setDentist] = useState<string | undefined>(booking?.dentist._id ?? "");
  const [date, setDate] = useState<Dayjs>(dayjs(booking?.bookingDate ?? Date.now()));
  const [error, setError] = useState<string | undefined>(undefined);

  const isUpdate = !!booking;

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

    const formattedDate = date.toDate().toISOString().replace(/T.*/, "");

    setLoading(true);
    if (isUpdate) {
      toast
        .promise(updateBooking(session.data, booking._id, formattedDate), {
          loading: "Updating booking...",
          success: () => {
            router.push("/mybooking");
            router.refresh();
            return "Updated!";
          },
          error: (err) => err.message,
        })
        .then(() => setLoading(false));
    } else {
      toast
        .promise(createBooking(session.data, dentist, formattedDate), {
          loading: "Creating booking...",
          success: () => {
            router.push("/mybooking");
            router.refresh();
            return "Created!";
          },
          error: (err) => err.message,
        })
        .then(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
      <div className="text-red-700 w-full text-left">{error}</div>
      {!isUpdate && (
        <>
          <div className="text-lg">Dentist</div>
          <Select
            className="w-full"
            value={dentist}
            onChange={(event: SelectChangeEvent) => setDentist(event.target.value)}
            disabled={isLoading}
            displayEmpty
          >
            {dentists.map((dentist) => (
              <MenuItem value={dentist._id} key={dentist._id}>
                {dentist.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={date}
          onChange={(date) => setDate(date!)}
          slotProps={{ actionBar: { actions: [] } }}
          disabled={isLoading}
        />
      </LocalizationProvider>
      <button
        disabled={isLoading}
        className="w-full px-3 py-2 text-white rounded-lg bg-ci-green border border-transparent
            focus:outline-none focus:border-black
            disabled:bg-opacity-50"
      >
        {isUpdate ? "Update booking" : "Create booking"}
      </button>
    </form>
  );
}
