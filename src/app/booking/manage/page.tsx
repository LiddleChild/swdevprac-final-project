import Loading from "@/components/Loading";
import ManageBookingPage from "@/components/ManageBookingPage";
import React from "react";

export default async function Home() {
  return (
    <Loading>
      <ManageBookingPage />
    </Loading>
  );
}
