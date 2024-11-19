"use client";

import { LinearProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import deleteDentist from "@/libs/deleteDentist";

type DentistDetailsProps = {
  dentist: any;
  did: string;
};

export default function DentistDetails({ dentist, did }: DentistDetailsProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = () => {
    if (!session) {
      router.push("/login");
      return;
    }

    toast.promise(deleteDentist(session, did), {
      loading: "Deleting dentist...",
      success: () => {
        router.refresh();
        router.push("/dentist");
        return "Dentist deleted!";
      },
      error: (err) => err.message,
    });
  };

  if (!dentist) {
    return <LinearProgress className="text-ci-green" color="inherit" />;
  }

  return (
    <div className="p-8 flex flex-col gap-8 h-screen">
      <div className="flex flex-row justify-between mt-8 items-center mx-4 font-bold text-6xl">
        Dentist
      </div>
      <hr className="border-t border-black" />
      <div className="flex flex-col gap-4 bg-white max-w-full mx-20 mt-4 rounded-lg relative lg:flex-row">
        <div className="relative flex lg:w-1/3 w-full h-96 rounded-l-lg overflow-hidden">
          <Image
            src={dentist.data.picture}
            alt="dentist"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="ml-4 flex-row flex w-full">
          <div className="flex flex-col">
            <div className="text-4xl my-8">{dentist.data.name}</div>
            <div className="flex flex-col text-xl mt-2 gap-1">
              <div>Hospital: {dentist.data.hospital}</div>
              <div>Address: {dentist.data.address}</div>
              <div>Expertist: {dentist.data.expertist}</div>
              <div>Tel: {dentist.data.tel}</div>
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="flex justify-end my-4 mr-4">
            {session?.user.role === "admin" && (
              <div className="flex flex-col justify-between">
                <Link href={`/dentist/${did}/edit`}>
                  <div>
                    <button>
                      <span
                        className="material-symbols-outlined flex-shrink-0 text-center"
                        style={{
                          fontSize: "30px",
                          minWidth: "30px",
                          textAlign: "center",
                        }}
                      >
                        Edit
                      </span>
                    </button>
                  </div>
                </Link>
                <div>
                  <button onClick={handleDelete}>
                    <span
                      className="material-symbols-outlined flex-shrink-0 text-center"
                      style={{
                        fontSize: "30px",
                        minWidth: "30px",
                        textAlign: "center",
                      }}
                    >
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
