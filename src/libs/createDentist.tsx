import { Session } from "next-auth";

export default async function createDentist(
  session: Session,
  name: string,
  hospital: string,
  address: string,
  expertist: string,
  tel: string,
  picture: string
) {
  if (session.user.role !== "admin") {
    throw new Error("Unauthorized: Only admins can create dentists.");
  }
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists`;
  const response = await fetch(url, {
    method: "POST",
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
