"use client";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect, useTransition } from "react";
// import { getSDEKTarifByCode } from "@/components/sdekAPI/getTarifByCode";

export function ShippingForm({ cities }, getSDEKTarifByCode) {
  const [city, setCity] = useState(cities[0]);
  const [isClient, setIsClient] = useState(false);
//   const [isPending, startTransition] = useTransition();
//   const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <Autocomplete
          className="my-8"
          value={city}
          onChange={(event, newValue) => {
            setCity(newValue);
          }}
          disablePortal
          options={cities}
          getOptionLabel={(data) =>
            data.city + ", " + data.region + ", " + data.country
          }
          sx={{ width: 400 }}
          renderOption={(props, cities) => {
            return (
              <li {...props} key={cities.code}>
                {cities.city + ", " + cities.region + ", " + cities.country}
              </li>
            );
          }}
          isOptionEqualToValue={(cities, value) => cities.code === value.code}
          renderInput={(params) => (
            <TextField {...params} label="Выбрать город" />
          )}
        />
      )}

      {city && <h1>{city.code}</h1>}
      {/* <button
        className="btn-primary btn"
        onClick={() => {

          startTransition(async () => {
            await getSDEKTarifByCode(44);

          });
        }}
      >
        Add to Cart
      </button> */}
    </div>
  );
}
