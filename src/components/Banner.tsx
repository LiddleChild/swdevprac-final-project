"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"];
  const [coverIndex, setCoverIndex] = useState<number>(0);

  const router = useRouter();
  const session = useSession();

  const buttonHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    router.push("/hospital");
  };

  return (
    <div
      className="relative size-full select-none hover:cursor-pointer"
      onClick={() => setCoverIndex((prev) => (prev + 1) % covers.length)}
    >
      <div className="-z-10 size-full absolute bg-black">
        <Image
          src={covers[coverIndex]}
          alt="banner"
          fill
          className="size-full opacity-30 object-cover"
        />
      </div>
      <div className="h-1/2 flex flex-col justify-end items-center text-white">
        <div className="font-bold text-5xl">Vaccine Service Center</div>
        <div className="font-light text-xl">Prevention is better than treatment</div>
      </div>
      <div className="absolute bottom-0 flex w-full justify-end p-8">
        <button className="text-xl bg-white px-4 py-2 group z-10" onClick={buttonHandler}>
          <div className="ease-in-out duration-300 group-hover:translate-x-2 group-hover:duration-100">
            Select Hospital &gt;
          </div>
        </button>
      </div>
      {session.data && (
        <div className="absolute right-4 top-4 text-white text-2xl">
          Welcome {session?.data?.user.name}
        </div>
      )}
    </div>
  );
}