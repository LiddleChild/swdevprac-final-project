import { formatDate, formatTelNumber } from "@/libs/utils/date";
import Image from "next/image";
import BookingActionPanel from "./BookingActionPanel";

type BookingCardProps = {
  booking: BookingItem;
};

export default function FullBookingCard({ booking }: BookingCardProps) {
  return (
    <div className="flex gap-8 flex-col sm:flex-row items-center justify-between">
      <div className="flex gap-4">
        <div className="relative rounded-full w-24 aspect-square overflow-hidden">
          <Image
            alt="dentist picture"
            src={booking.dentist.picture}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
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
      </div>
      <BookingActionPanel bookingId={booking?._id} from="manage" />
    </div>
  );
}
