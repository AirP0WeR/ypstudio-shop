'use server'
import { SDEKCitiesURL } from "./constants";
import { getSDEKToken } from "./getSDEKToken";

export async function getSDEKCities(code) {
  const token = await getSDEKToken();
  const data = await fetch(
    SDEKCitiesURL(code),
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      next: { revalidate: 3600 },
    }
  );

  return data.json();
}
