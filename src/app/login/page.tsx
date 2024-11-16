"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response!.ok) {
      router.push("/");
    } else {
      setError(response!.error);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <div>Login page</div>
      Email: <input type="text" ref={emailRef} className="border" />
      Password: <input type="password" ref={passwordRef} className="border" />
      {error}
      <button>Login</button>
    </form>
  );
}
