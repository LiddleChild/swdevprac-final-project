export default async function getDentists(): Promise<DentistsJson> {
  const url = new URL(`/api/v1/dentists`, process.env.NEXT_PUBLIC_BACKEND_URL).href;
  const response = await fetch(url);
  const json = (await response.json()) as DentistsJson;

  return json;
}
