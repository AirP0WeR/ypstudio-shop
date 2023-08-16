const client_id = process.env.SDEK_CLIENT_ID;
const client_secret = process.env.SDEK_CLIENT_SECRET;

export function SDEKCitiesURL(code){

  const req = `https://api.edu.cdek.ru/v2/location/cities/?country_codes=RU&region_code=${code}&size=10000`;
  return req
} 
export const SDEKRegionsURL = "https://api.edu.cdek.ru/v2/location/regions/?country_codes=RU";
export const SDEKTokenURL = `https://api.edu.cdek.ru/v2/oauth/token?parameters&grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;
export const SDEKGetTarifByCodeURL =
  "https://api.edu.cdek.ru/v2/calculator/tariff";
export const SDEKGetAvailableTarifURL =
  "https://api.edu.cdek.ru/v2/calculator/tarifflist";

export function SDEKPVZURL(code, type) {
  const req = `https://api.edu.cdek.ru/v2/deliverypoints?city_code=${code}&type=${type}`;
  return req
}

export function SDEKGetTarifByCodeBody(toLocation) {
  const req = {
    tariff_code: "483",
    from_location: {
      code: 414,
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

export function SDEKGetAvailableTarifBody(toLocation) {
  const req = {
    from_location: {
      code: 414,
    },
    to_location: {
      code: toLocation,
    },
    packages: [
      {
        weight: 40,
      },
    ],
  };
  return req;
}
