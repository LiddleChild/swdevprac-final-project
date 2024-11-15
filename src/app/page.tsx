import Banner from "@/components/Banner";
import PromoteCard from "@/components/PromoteCard";

export default function Home() {
  return (
    <div className="size-full">
      <Banner />
      <div className="absolute bottom-2 w-full flex justify-center">
        <PromoteCard />
      </div>
    </div>
  );
}
