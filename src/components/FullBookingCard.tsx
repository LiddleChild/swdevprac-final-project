import { formatDate, formatTelNumber } from "@/libs/utils/date";
import Image from "next/image";
import BookingActionPanel from "./BookingActionPanel";

type BookingCardProps = {
  booking: BookingItem;
};

export default function FullBookingCard({ booking }: BookingCardProps) {
  return (
    <div className="flex gap-8 flex-col sm:flex-row items-center">
      <div className="relative rounded-full w-40 aspect-square overflow-hidden flex-grow-0">
        <Image
          alt="dentist picture"
          src={booking.dentist.picture}
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <div className="flex gap-4 justify-between w-full">
        <div className="flex flex-col justify-center">
          <div className="text-xl">{booking.user.name}</div>
          <div>{booking.dentist.name}</div>
          <div>
            <span className="font-semibold">Appointment Date: </span>
            {formatDate(new Date(booking.bookingDate))}
          </div>
          <div>
            <span className="font-semibold">Book Date: </span>
            {formatDate(new Date(booking.createdAt))}
          </div>
        </div>
        <BookingActionPanel bookingId={booking?._id} from="manage" />
      </div>
    </div>
  );
}
