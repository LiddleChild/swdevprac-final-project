import Loading from "@/components/Loading";
import MyBookingPage from "@/components/MyBookingPage";

export default async function Home() {
  return (
    <Loading>
      <MyBookingPage />;
    </Loading>
  );
}
