import BookingCard from "@/components/BookingCard";
import HorizontalDivider from "@/components/HorizontalDivider";
import { getSession } from "@/libs/auth/nextAuthConfig";
import getBooking from "@/libs/getBooking";
import Link from "next/link";

type BookingActionPanelProps = { hasBooking: boolean };
const BookingActionPanel = ({ hasBooking }: BookingActionPanelProps) => {
  if (hasBooking)
    return (
      <div className="flex flex-row gap-4">
        <Link
          href="/"
          className="text-gray-600 flex justify-center items-center rounded-lg p-2 hover:text-ci-green hover:bg-gray-100"
        >
          <span className="material-symbols-outlined flex-shrink-0 text-center">edit</span>
        </Link>
        <Link
          href="/"
          className="text-gray-600 flex justify-center items-center rounded-lg p-2 hover:text-red-700 hover:bg-gray-100"
        >
          <span className="material-symbols-outlined flex-shrink-0 text-center">delete</span>
        </Link>
      </div>
    );
  else
    return (
      <Link
        href="/"
        className="bg-ci-green text-white px-3 py-2 rounded-lg aria-disabled:bg-opacity-50"
      >
        New Booking
      </Link>
    );
};

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
            <BookingActionPanel hasBooking={!!booking} />
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
