export default async function userLogIn(userEmail: string, userPassword: string) {
  const url = new URL(`/api/v1/auth/login`, "https://vaccine-app-backend-zeta.vercel.app:443").href;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("Failed to login");
  }

  return await response.json();
}
