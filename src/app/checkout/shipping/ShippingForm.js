"use client";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useState, useTransition, useEffect } from "react";
import { getSDEKAvailableTarif } from "@/components/sdekAPI/getAvailableTarif";
import { findSDEKById } from "@/components/daDataAPI/findById";

export function ShippingForm() {
  const [value, setValue] = useState();
  const [tarifs, setTarifs] = useState();
  const [isPending, startTransition] = useTransition();
  const [isClient, setIsClient] = useState(false);
  const [isCity, setCity] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      <h1 className="text-xl mt-5">Выберите город</h1>
      {isClient && (
        <AddressSuggestions
          token={process.env.NEXT_PUBLIC_DA_DATA_KEY}
          value={value}
          onChange={setValue}
          minChars={3}
          hintText={"Выберите вариант или продолжите ввод"}
          delay={500}
          filterFromBound="city"
          filterToBound="city"
          inputProps={{ disabled: isCity, placeholder: "г Москва" }}
        />
      )}

      {value && <h1>Город доставки {value.data.region_with_type + ", " + value.data.city_with_type}</h1> }

      <button
        disabled={!value}
        className="btn-primary btn mt-5"
        onClick={() =>
          startTransition(async () => {
            const sdekId = await findSDEKById(value.data.city_kladr_id);
            if (sdekId.suggestions.length !== 0) {
              const tarifs = await getSDEKAvailableTarif(
                sdekId.suggestions[0].data.cdek_id
              );
              setTarifs(tarifs);
              setCity(true);
            } else {
              alert("В данный город нет доставки, выберите другой город");
            }
          })
        }
      >
        найти когд города СДЭК и тариф
      </button>
      <button
        className="btn btn-primary w-50 ml-5"
        disabled={!isCity}
        onClick={() => {
          setCity(false);
        }}
      >
        Изменить город
      </button>
      <div>
        Всего:
        {tarifs
          ? tarifs.tariff_codes.map(
              (e) =>
                (e.tariff_code === 482 ||
                  e.tariff_code === 483 ||
                  e.tariff_code === 486) && (
                  <li key={e.tariff_code}>
                    {"Стоимость " +
                      e.delivery_sum +
                      " р" +
                      " " +
                      e.tariff_code +
                      " " +
                      e.tariff_name +
                      " " +
                      e.tariff_description +
                      " " +
                      e.delivery_mode +
                      " " +
                      e.calendar_min +
                      " " +
                      e.calendar_max}
                  </li>
                )
            )
          : null}
        {isPending && <span className="loading loading-spinner loading-sm" />}
      </div>
    </div>
  );
}
