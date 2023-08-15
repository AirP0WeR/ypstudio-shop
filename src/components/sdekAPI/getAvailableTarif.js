"use server";
import {
  SDEKGetAvailableTarifURL,
  SDEKGetAvailableTarifBody,
} from "./constants";
import { getSDEKToken } from "./getSDEKToken";

export async function getSDEKAvailableTarif(req) {
  const bodyReq = SDEKGetAvailableTarifBody(req);
  const token = await getSDEKToken();

  let response;
  
  try {
    response = await fetch(SDEKGetAvailableTarifURL, {
      method: "post",
      body: JSON.stringify(bodyReq),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
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
