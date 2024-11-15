import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function TopMenu() {
  const session = await getServerSession();

  return (
    <div className="relative w-full h-16 flex flex-row justify-between items-center gap-4">
      {session ? (
        <TopMenuItem title="Sign-Out" pageRef="/api/auth/signout" />
      ) : (
        <TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
      )}
      <TopMenuItem title="My Booking" pageRef="mybooking" />
      <div className="w-full h-16 flex flex-row justify-end items-center">
        <TopMenuItem title="Booking" icon="syringe" pageRef="/booking" />
        <div className="relative w-32 h-16">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="vaccine logo"
              className="size-full object-contain"
              fill
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
