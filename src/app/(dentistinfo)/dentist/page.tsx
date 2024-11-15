import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function Page() {
  const dentistsJson = getDentists();

  return (
    <Suspense fallback={<LinearProgress />}>
      <DentistCatalog dentistsJson={dentistsJson} />
    </Suspense>
  );
}
