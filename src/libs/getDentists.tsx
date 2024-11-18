export default async function getDentists(): Promise<DentistsJson> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists`;
  const response = await fetch(url);
  const json = (await response.json()) as DentistsJson;
  return json;
}
