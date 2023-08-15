'use server'
import { SDEKGetTarifByCodeURL, SDEKGetTarifByCodeBody } from "./constants";
import { getSDEKToken } from "./getSDEKToken";

export async function getSDEKTarifByCode(req) {
  console.log(req)
  const bodyReq = SDEKGetTarifByCodeBody(req);
  console.log(bodyReq)
  const token = await getSDEKToken();
  const data = await fetch(SDEKGetTarifByCodeURL, {
    method: "post",
    body: JSON.stringify(bodyReq),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  }).then(response=>response.json())

  console.log(data)
  return data
}
