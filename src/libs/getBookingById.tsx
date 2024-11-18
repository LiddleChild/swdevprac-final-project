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

  if (!response.ok) throw new Error("Failed to get booking. Please try again later.");

  const content = await response.json();

  if (!content.success) {
    throw new Error(content.message);
  }

  return content.data;
}
