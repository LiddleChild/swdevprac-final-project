import Card from "./Card";

type HospitalCatalogProps = {
  hospitalsJson: Promise<HospitalsJson>;
};

export default async function HospitalCatalog({ hospitalsJson }: HospitalCatalogProps) {
  const hospitals = await hospitalsJson;

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-row gap-8">
        {hospitals.data.map((hospital) => (
          <Card key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}
