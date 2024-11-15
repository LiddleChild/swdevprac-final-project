export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-8 bg-[#8ED3B1] h-screen">
      <div className="flex flex-row justify-between mt-8 items-center mx-4">
        <div className="font-bold text-6xl">Edit Dentist Information</div>
      </div>
      <hr className="border-t border-black" />
      <div className="flex flex-col gap-4 bg-white max-w-full mx-20 mt-4 rounded-lg items-center">
        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Name</div>
          <div className="w-6 text-center">:</div>
          <input className="border border-black rounded-lg flex-1 p-2" />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Hospital</div>
          <div className="w-6 text-center">:</div>
          <input className="border border-black rounded-lg flex-1 p-2" />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Address</div>
          <div className="w-6 text-center">:</div>
          <input className="border border-black rounded-lg flex-1 p-2" />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Expertist</div>
          <div className="w-6 text-center">:</div>
          <input className="border border-black rounded-lg flex-1 p-2" />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Tel</div>
          <div className="w-6 text-center">:</div>
          <input className="border border-black rounded-lg flex-1 p-2" />
        </div>

        <div className="flex flex-row gap-2 items-center my-4">
          <div className="w-20 text-right">Picture</div>
          <div className="w-6 text-center">:</div>
          <input className="border border-black rounded-lg flex-1 p-2" />
        </div>

        <div className="px-4 py-2 bg-[#15B69B] rounded-lg text-xl hover:bg-[#009078] mb-8">
          <button>Edit Dentist</button>
        </div>
      </div>
    </div>
  );
}
