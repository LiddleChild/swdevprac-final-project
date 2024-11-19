import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";

type LoadingProps = {
  children: React.ReactNode;
};

export default function Loading({ children }: LoadingProps) {
  return (
    <Suspense fallback={<LinearProgress className="text-ci-green" color="inherit" />}>
      {children}
    </Suspense>
  );
}
