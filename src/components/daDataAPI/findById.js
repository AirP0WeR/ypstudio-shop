import { DaDataFindByIdURL } from "./constants";

export async function findSDEKById(query) {
  let response;
  try {
    response = await fetch(DaDataFindByIdURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + process.env.NEXT_PUBLIC_DA_DATA_KEY,
      },
      body: JSON.stringify({ query: query }),
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.log("There was an error", error);
  }

  if (response?.ok) {
    return response.json();
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }
}
