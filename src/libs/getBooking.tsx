import { Session } from "next-auth";
import { URL } from "url";

export default async function getMyBooking(session: Session): Promise<BookingItem | null> {
  const url = new URL("/api/v1/bookings", process.env.NEXT_PUBLIC_BACKEND_URL).href;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  const json = (await response.json()) as BookingsJson;

  const myBooking = json.data.filter((booking) => booking.user === session.user._id);

  return myBooking.length > 0 ? myBooking[0] : null;
}
