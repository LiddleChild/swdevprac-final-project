import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function TopMenu() {
  const session = await getServerSession();

  return (
    <div className="fixed top-0 left-0 h-screen flex flex-col justify-between items-center bg-[#15B69B] group hover:w-[15%] transition-all duration-300 w-[5%] z-10">
      <div className="flex flex-col items-center gap-4 mt-20 w-full">
        <div className="h-20 w-full">
          <TopMenuItem title="Dentist" icon="Dentistry" pageRef="/dentist" />
        </div>
        <div className="h-20 w-full">
          <TopMenuItem
            title="Booking"
            icon="calendar_today"
            pageRef="/booking"
          />
        </div>
      </div>
      <div className="mb-8 h-20 w-full">
        {session ? (
          <TopMenuItem
            title="Logout"
            icon="Logout"
            pageRef="/api/auth/signout"
          />
        ) : (
          <TopMenuItem title="Login" icon="Login" pageRef="/api/auth/signin" />
        )}
      </div>
    </div>
  );
}
