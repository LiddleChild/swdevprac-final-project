import { Session } from "next-auth";

export default async function deleteBooking(session: Session, bookingId: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${bookingId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  const content = await response.json();

  if (!content.success) {
    console.error(content.message);
    throw new Error(content.message);
  }
}
