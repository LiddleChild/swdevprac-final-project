import BookingForm from "@/components/BookingForm";
import HorizontalDivider from "@/components/HorizontalDivider";
import { getSession } from "@/libs/auth/nextAuthConfig";
import getBookingById from "@/libs/getBookingById";
import getDentists from "@/libs/getDentists";

type EditBookingProps = {
  params: { bookingId: string };
};

export default async function EditBooking({ params: { bookingId } }: EditBookingProps) {
  const dentists = await getDentists();
  const session = await getSession();
  const booking = session ? await getBookingById(session, bookingId) : null;

  console.log(session);

  return (
    <div className="flex justify-center items-center size-full p-2">
      <div
        className="flex flex-col gap-8 bg-white px-6 py-8 size-full items-center
      sm:w-full sm:h-fit sm:rounded-lg sm:max-w-[768px] sm:justify-center sm:border sm:border-gray-300"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row justify-between items-center px-2">
            <div className="text-2xl sm:text-4xl">Update booking</div>
          </div>
          <HorizontalDivider />
          <BookingForm dentists={dentists.data} booking={booking ?? undefined} />
        </div>
      </div>
    </div>
  );
}
