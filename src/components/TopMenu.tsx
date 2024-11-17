"use client";

import { signOut, useSession } from "next-auth/react";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
  const session = useSession();

  return (
    <div className="fixed top-0 left-0 h-screen flex flex-col justify-between items-center bg-[#15B69B] group hover:w-[15%] transition-all duration-300 w-[5%] z-10">
      <div className="flex flex-col items-center gap-4 mt-20 w-full">
        <div className="h-20 w-full">
          <TopMenuItem title="Dentist" icon="Dentistry" pageRef="/dentist" />
        </div>
        <div className="h-20 w-full">
          <TopMenuItem title="Booking" icon="calendar_today" pageRef="/mybooking" />
        </div>
      </div>
      <div className="mb-8 h-20 w-full">
        {session.data ? (
          <TopMenuItem onClick={() => signOut()} title="Logout" icon="Logout" />
        ) : (
          <TopMenuItem title="Login" icon="Login" pageRef="/login" />
        )}
      </div>
    </div>
  );
}
