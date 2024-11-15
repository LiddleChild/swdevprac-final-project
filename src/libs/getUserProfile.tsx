import { error } from "console";

export default async function getUserProfile(token: string) {
  const url = new URL(`/api/v1/auth/me`, "https://vaccine-app-backend-zeta.vercel.app:443").href;
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}
