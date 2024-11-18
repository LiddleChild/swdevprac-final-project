export default async function getDentist(id: string): Promise<DentistJson> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists/${id}`;
  const response = await fetch(url);
  const json = (await response.json()) as DentistJson;

  return json;
}
