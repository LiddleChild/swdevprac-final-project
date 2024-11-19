import FullBookingCard from "@/components/FullBookingCard";
import HorizontalDivider from "@/components/HorizontalDivider";
import { getSession } from "@/libs/auth/nextAuthConfig";
import getBookings from "@/libs/getBookings";
import React from "react";

export default async function ManageBookingPage() {
  const session = await getSession();
  const bookings = session ? await getBookings(session) : null;

  return (
    <div className="flex justify-center size-full p-2">
      <div
        className="flex flex-col gap-8 bg-white px-6 py-8 size-full items-center
        sm:w-full sm:h-fit sm:rounded-lg sm:max-w-[768px] sm:justify-center sm:border sm:border-gray-300"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row justify-between items-center px-2">
            <div className="text-2xl sm:text-4xl">Manage Bookings</div>
          </div>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <React.Fragment key={booking._id}>
                <HorizontalDivider />
                <FullBookingCard booking={booking} />
              </React.Fragment>
            ))
          ) : (
            <>
              <HorizontalDivider />
              <div className="w-full py-12 flex justify-center items-center flex-col gap-2">
                No booking found
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
