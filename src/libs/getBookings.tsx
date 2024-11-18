import { Session } from "next-auth";

export default async function getBookings(session: Session): Promise<BookingItem[] | null> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  const content = (await response.json()) as BookingsJson;

  return content.data;
}
