"use client";

import InputField from "@/components/auth/InputField";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { registerAction, RegistrationFormState } from "./actions";
import Link from "next/link";

export default function Register() {
  const initialState = {};
  const [form, formAction] = useFormState<RegistrationFormState, FormData>(
    registerAction,
    initialState
  );

  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => setLoading(false), [form]);

  return (
    <div className="flex justify-center items-center bg-ci-green size-full">
      <div
        className="flex flex-col gap-8 bg-white px-6 py-8 size-full justify-center items-center
      sm:w-full sm:h-fit sm:rounded-lg sm:max-w-[384px]"
      >
        {form.success ? (
          <div>
            <div className="text-4xl mb-4">Registration Success</div>
            <Link href="/login" className="text-ci-green">
              Back to login
            </Link>
          </div>
        ) : (
          <form
            className="flex flex-col items-center gap-4 bg-white px-1 rounded-lg w-full"
            action={formAction}
            onSubmit={() => setLoading(true)}
          >
            <div className="text-4xl mb-4">Register</div>
            <InputField name="name" label="Name Surname" disabled={isLoading} />
            <InputField name="email" label="Email" disabled={isLoading} />
            <InputField name="telephone" label="Telephone" disabled={isLoading} />
            <InputField name="password" label="Password" type="password" disabled={isLoading} />
            <div className="text-red-700 leading-5 min-h-5 w-full text-left">{form.error}</div>
            <button
              className="w-full max-w-[384px] px-3 py-2 text-white rounded-lg bg-ci-green border border-transparent
            focus:outline-none focus:border-black
            disabled:bg-opacity-50"
              disabled={isLoading}
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
