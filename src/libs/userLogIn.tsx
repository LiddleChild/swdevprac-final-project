export default async function userLogIn(email: string, password: string) {
  let response;
  let content;
  try {
    const url = new URL(`/api/v1/auth/login`, process.env.BACKEND_URL).href;
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    content = await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Please try again later.");
  }

  if (!response.ok) {
    throw new Error(content.msg);
  }

  return content;
}
