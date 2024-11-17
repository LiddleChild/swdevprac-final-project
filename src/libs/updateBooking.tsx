import { Session } from "next-auth";

export default async function updateBooking(session: Session, bookingId: string, date: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${bookingId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookingDate: date,
    }),
  });

  const content = await response.json();

  if (!content.success) {
    console.error(content.message);
    throw new Error(content.message);
  }
}
