import CreateBookingForm from "@/components/CreateBookingForm";
import HorizontalDivider from "@/components/HorizontalDivider";
import getDentists from "@/libs/getDentists";

export default async function CreateBooking() {
  const dentists = await getDentists();

  return (
    <div className="flex justify-center items-center size-full p-2">
      <div
        className="flex flex-col gap-8 bg-white px-6 py-8 size-full items-center
      sm:w-full sm:h-fit sm:rounded-lg sm:max-w-[768px] sm:justify-center sm:border sm:border-gray-300"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row justify-between items-center px-2">
            <div className="text-2xl sm:text-4xl">Create booking</div>
          </div>
          <HorizontalDivider />
          <CreateBookingForm dentists={dentists.data} />
        </div>
      </div>
    </div>
  );
}
