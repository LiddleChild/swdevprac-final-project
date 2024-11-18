"use client";
import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [dentistsJson, setDentistsJson] = useState<DentistsJson | null>(null);

  useEffect(() => {
    const fetchDentists = async () => {
      const data = await getDentists();
      setDentistsJson(data);
    };

    fetchDentists();
  }, []);

  return (
    <div>
      <Suspense fallback={<LinearProgress />}>
        {dentistsJson ? (
          <DentistCatalog dentistsJson={Promise.resolve(dentistsJson)} />
        ) : (
          <LinearProgress />
        )}
      </Suspense>
    </div>
  );
}
