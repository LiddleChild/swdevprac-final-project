"use client";

import DentistDetails from "@/components/DentistDetails";
import getDentist from "@/libs/getDentist";

type PageProps = {
  params: { did: string };
};

export default async function Page({ params: { did } }: PageProps) {
  const dentist = await getDentist(did);
  return <DentistDetails dentist={dentist} did={did} />;
}
