export type UserRegistrationInfo = {
  name?: string;
  tel?: string;
  email?: string;
  password?: string;
};

export default async function userRegister(userInfo: UserRegistrationInfo) {
  let response;
  let content;
  try {
    const url = new URL(`/api/v1/auth/register`, process.env.NEXT_PUBLIC_BACKEND_URL).href;
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "user",
        ...userInfo,
      }),
    });

    content = await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Please try again later.");
  }

  if (!content.success) {
    throw new Error(content.msg);
  }

  return content;
}
