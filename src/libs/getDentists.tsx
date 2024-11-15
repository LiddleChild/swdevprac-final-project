export default async function getDentists(): Promise<DentistsJson> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = new URL(`/api/v1/dentists`, "http://localhost:5000/").href;
  const response = await fetch(url);
  const json = (await response.json()) as DentistsJson;

  return json;
}
