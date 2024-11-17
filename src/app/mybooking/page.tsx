import BookingActionPanel from "@/components/BookingActionPanel";
import BookingCard from "@/components/BookingCard";
import HorizontalDivider from "@/components/HorizontalDivider";
import { getSession } from "@/libs/auth/nextAuthConfig";
import getBooking from "@/libs/getBooking";

export default async function MyBookingPage() {
  const session = await getSession();
  const booking = session ? await getBooking(session) : null;

  return (
    <div className="flex justify-center items-center size-full p-2">
      <div
        className="flex flex-col gap-8 bg-white px-6 py-8 size-full items-center
      sm:w-full sm:h-fit sm:rounded-lg sm:max-w-[768px] sm:justify-center sm:border sm:border-gray-300"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row justify-between items-center px-2">
            <div className="text-2xl sm:text-4xl">My Booking</div>
            <BookingActionPanel hasBooking={!!booking} bookingId={booking?._id} />
          </div>
          <HorizontalDivider />
          {booking ? (
            <BookingCard booking={booking} />
          ) : (
            <div className="w-full py-12 flex justify-center items-center">No booking made</div>
          )}
        </div>
      </div>
    </div>
  );
}
