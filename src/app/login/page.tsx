"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (response!.ok) {
      router.push("/");
    } else {
      setError(response!.error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-ci-green size-full">
      <div
        className="flex flex-col gap-8 bg-white px-6 py-8 size-full justify-center items-center
      sm:w-full sm:h-fit sm:rounded-lg sm:max-w-[384px]"
      >
        <form
          className="flex flex-col items-center gap-4 bg-white px-1 rounded-lg w-full"
          onSubmit={submitHandler}
        >
          <div className="text-4xl mb-4">Login</div>
          <div className="w-full max-w-[384px]">
            <div className="text-lg">Email</div>
            <input
              type="text"
              ref={emailRef}
              className="mt-2 w-full px-3 py-2 border border-ci-gray rounded-lg bg-ci-gray
              focus:outline-none focus:border-gray-400
              disabled:bg-opacity-50"
              disabled={isLoading}
            />
          </div>
          <div className="w-full max-w-[384px]">
            <div className="text-lg">Password</div>
            <input
              type="text"
              ref={passwordRef}
              className="mt-2 w-full px-3 py-2 border border-ci-gray rounded-lg bg-ci-gray
              focus:outline-none focus:border-gray-400
              disabled:bg-opacity-50"
              disabled={isLoading}
            />
          </div>
          <div className="text-red-700 leading-5 min-h-5 w-full text-left">{error}</div>
          <button
            className="w-full max-w-[384px] px-3 py-2 text-white rounded-lg bg-ci-green border border-transparent
            focus:outline-none focus:border-black
            disabled:bg-opacity-50"
            disabled={isLoading}
          >
            Login
          </button>
        </form>
        <div className="border-b border-gray-500 w-full"></div>
        <div className="text-center">
          <span className="mr-2">No account yet?</span>
          <Link href="/register" className="text-ci-green">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
