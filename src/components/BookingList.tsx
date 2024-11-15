"use client";

import { removeBooking } from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

const BookingCard = ({ booking }: { booking: BookingItem }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cancelHandler = () => {
    dispatch(removeBooking(booking.id));
  };

  return (
    <div className="flex flex-row justify-between w-full rounded-lg border border-gray-200 p-4">
      <div className="">
        <div>Name: {booking.name}</div>
        <div>Surname: {booking.id}</div>
        <div>ID: {booking.surname}</div>
        <div>Hospital: {booking.hospital}</div>
        <div>Date: {booking.bookDate}</div>
      </div>
      <Button variant="contained" color="error" onClick={cancelHandler}>
        Cancel
      </Button>
    </div>
  );
};

export default function BookingList() {
  const bookings = useAppSelector((state) => state.bookSlice.bookItems);

  if (bookings.length === 0)
    return <div className="size-full flex justify-center items-center">No Vaccine Booking</div>;

  return (
    <div className="flex flex-col gap-4 justify-center px-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
