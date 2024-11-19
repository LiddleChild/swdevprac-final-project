"use client";

import deleteBooking from "@/libs/deleteBooking";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type BookingActionPanelProps = {
  bookingId?: string;
  from: string;
};

export default function BookingActionPanel({ bookingId, from }: BookingActionPanelProps) {
  const session = useSession();
  const router = useRouter();

  const deleteHandler = () => {
    if (!session.data) {
      router.push("/login");
      return;
    }

    toast.promise(deleteBooking(session.data, bookingId!), {
      loading: "Deleting booking...",
      success: () => {
        router.refresh();
        return "Booking deleted!";
      },
      error: (err) => err.message,
    });
  };

  return (
    <div className="flex flex-col justify-around items-center sm:flex-row gap-4">
      <Link
        href={{ pathname: `/booking/${bookingId}/edit`, query: { from } }}
        className="text-gray-600 flex justify-center items-center rounded-lg p-2 hover:text-ci-green hover:bg-gray-100"
      >
        <span className="material-symbols-outlined flex-shrink-0 text-center">edit</span>
      </Link>
      <button
        className="text-gray-600 flex justify-center items-center rounded-lg p-2 hover:text-red-700 hover:bg-gray-100"
        onClick={deleteHandler}
      >
        <span className="material-symbols-outlined flex-shrink-0 text-center">delete</span>
      </button>
    </div>
  );
}
