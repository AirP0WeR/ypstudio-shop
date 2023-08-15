import { SDEKRegionsURL } from "./constants";
import { getSDEKToken } from "./getSDEKToken";

export async function getSDEKRegions() {
  const token = await getSDEKToken();
  const data = await fetch(
    SDEKRegionsURL,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      next: { revalidate: 3600 },
    }
  );

  return data.json();
}
