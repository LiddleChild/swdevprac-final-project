"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="size-full flex flex-col justify-center items-center gap-4">
      <div>Something went wrong. Please try again later.</div>
      <button onClick={reset}>
        <span className="material-symbols-outlined">restart_alt</span>
      </button>
    </div>
  );
}
