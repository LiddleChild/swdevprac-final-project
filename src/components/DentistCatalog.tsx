"use client";
import Link from "next/link";
import Card from "./Card";

type DentistCatalogProps = {
  dentistsJson: Promise<DentistsJson>;
};

export default async function DentistCatalog({
  dentistsJson,
}: DentistCatalogProps) {
  const dentists = await dentistsJson;

  return (
    <div className="p-8 flex flex-col gap-8 bg-[#8ED3B1] h-max">
      <div className="flex flex-row justify-between mt-8 items-center mx-4">
        <div className="font-bold text-6xl">Dentist Lists</div>
        <Link href="/dentist/create">
          <div className="px-4 py-2 bg-[#15B69B] rounded-lg text-xl hover:bg-[#009078]">
            <button>New Dentist</button>
          </div>
        </Link>
      </div>
      <hr className="border-t border-black" />
      <div className="grid grid-cols-2 gap-x-40 gap-y-10 justify-start mx-20 mt-4">
        {dentists.data.map((dentist) => (
          <Card key={dentist.id} dentist={dentist} />
        ))}
      </div>
    </div>
  );
}
