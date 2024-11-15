import getDentist from "@/libs/getDentist";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";

type PageProps = {
  params: { hid: string };
};

export default async function Page({ params: { hid } }: PageProps) {
  const dentist = await getDentist(hid);

  return (
    <Suspense fallback={<LinearProgress />}>
      <div className="p-8 flex flex-col gap-8 bg-[#8ED3B1] h-screen">
        <div className="flex flex-row justify-between mt-8 items-center mx-4 font-bold text-6xl">
          Dentist
        </div>
        <hr className="border-t border-black" />
        <div className="flex flex-row gap-4 bg-white max-w-full mx-20 mt-4 rounded-lg relative">
          <div className="relative flex w-1/5 h-[256px] rounded-l-lg overflow-hidden">
            <Image
              src={dentist.data.picture}
              alt="dentist"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="ml-4">
            <div className="text-4xl my-8">{dentist.data.name}</div>
            <div className="flex flex-col text-xl mt-2 gap-1">
              <div>Hospital: {dentist.data.hospital}</div>
              <div>Address: {dentist.data.address}</div>
              <div>Expertist: {dentist.data.expertist}</div>
              <div>Tel: {dentist.data.tel}</div>
            </div>
          </div>
          <Link href={`/dentist/${hid}/edit`}>
            <div className="absolute top-6 right-6">
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
          <div className="absolute bottom-6 right-6">
            <button>
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
      </div>
    </Suspense>
  );
}
