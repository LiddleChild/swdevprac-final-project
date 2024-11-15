import { URL } from "url";

export default async function getHospital(id: string): Promise<HospitalJson> {
  const url = new URL(`/api/v1/hospitals/${id}`, "https://vaccine-app-backend-zeta.vercel.app/")
    .href;
  const response = await fetch(url);
  const json = (await response.json()) as HospitalJson;

  return json;
}
