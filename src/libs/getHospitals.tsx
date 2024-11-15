export default async function getHospitals(): Promise<HospitalsJson> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = new URL(`/api/v1/hospitals`, "https://vaccine-app-backend-zeta.vercel.app/").href;
  const response = await fetch(url);
  const json = (await response.json()) as HospitalsJson;

  return json;
}
