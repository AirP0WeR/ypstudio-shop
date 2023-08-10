'use server'
import { SDEKGetTarifByCodeURL, SDEKGetTarifByCodeBody } from "./constants";
import { getSDEKToken } from "./getSDEKToken";

export async function getSDEKTarifByCode(req) {

  const bodyReq = SDEKGetTarifByCodeBody(req);
  const token = await getSDEKToken();
  const data = await fetch(SDEKGetTarifByCodeURL, {
    method: "post",
    body: JSON.stringify(bodyReq),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });
  console.log(data)
  return data.json();
}
