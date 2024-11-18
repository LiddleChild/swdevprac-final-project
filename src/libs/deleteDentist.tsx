import { Session } from "next-auth";

export default async function deleteDentist(
  session: Session,
  dentistId: string
) {
  if (session.user.role !== "admin") {
    throw new Error("Unauthorized: Only admins can edit dentists.");
  }
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists/${dentistId}`;
  console.log("Deleting dentist with ID:", dentistId);

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
