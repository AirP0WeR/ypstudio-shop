const client_id = process.env.SDEK_CLIENT_ID;
const client_secret = process.env.SDEK_CLIENT_SECRET;

export const SDEKCitiesURL = "https://api.edu.cdek.ru/v2/location/cities";
export const SDEKTokenURL = `https://api.edu.cdek.ru/v2/oauth/token?parameters&grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;
export const SDEKGetTarifByCodeURL =
  "https://api.edu.cdek.ru/v2/calculator/tariff";

export function SDEKGetTarifByCodeBody(toLocation) {
  const req = {
    tariff_code: "483",
    from_location: {
      code: 44,
    },
    to_location: {
      code: toLocation,
    },
    packages: [
      {
        weight: 50,
      },
    ],
  };
  return req;
}
