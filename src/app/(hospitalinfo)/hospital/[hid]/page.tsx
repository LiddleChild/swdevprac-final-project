import getHospital from "@/libs/getHospital";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";

type PageProps = {
  params: { hid: string };
};

export default async function Page({ params: { hid } }: PageProps) {
  const hospital = await getHospital(hid);

  return (
    <Suspense fallback={<LinearProgress />}>
      <div className="size-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-6 w-[768px]">
          <div className="text-right text-2xl font-semibold">{hospital.data.name}</div>
          <div className="flex flex-row gap-4">
            <div className="relative flex w-1/2 h-[256px] rounded-lg overflow-hidden">
              <Image
                src={hospital.data.picture}
                alt="hospital"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="">
              <div>Name: {hospital.data.name}</div>
              <div>Address: {hospital.data.address}</div>
              <div>District: {hospital.data.district}</div>
              <div>Postal Code: {hospital.data.postalcode}</div>
              <div>Tel: {hospital.data.tel}</div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
