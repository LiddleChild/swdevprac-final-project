import { URL } from "url";

export default async function getDentist(id: string): Promise<DentistJson> {
  const url = new URL(`/api/v1/dentists/${id}`, "http://localhost:5000/").href;
  const response = await fetch(url);
  const json = (await response.json()) as DentistJson;

  return json;
}
