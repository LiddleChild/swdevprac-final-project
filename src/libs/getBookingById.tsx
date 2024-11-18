import { Session } from "next-auth";

export default async function getBookingById(
  session: Session,
  bookingId: string
): Promise<BookingItem | null> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${bookingId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  const content = await response.json();

  if (!content.success) {
    throw new Error(content.message);
  }

  return content.data;
}
