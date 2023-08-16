"use server";
import { SDEKPVZURL } from "./constants";
import { getSDEKToken } from "./getSDEKToken";

export async function getSDEKPVZ(city, type) {
  let response;
  const token = await getSDEKToken();
  try {
    response = await fetch(SDEKPVZURL(city, type), {
      headers: {
        Authorization: "Bearer " + token,
      },
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
