import { Session } from "next-auth";

export default async function editDentist(
  session: Session,
  dentistId: string,
  name: string,
  hospital: string,
  address: string,
  expertist: string,
  tel: string,
  picture: string
) {
  if (session.user.role !== "admin") {
    throw new Error("Unauthorized: Only admins can edit dentists.");
  }
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists/${dentistId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      hospital,
      address,
      expertist,
      tel,
      picture,
    }),
  });

  const content = await response.json();

  if (!content.success) {
    console.error(content.message);
    throw new Error(content.message);
  }
}
