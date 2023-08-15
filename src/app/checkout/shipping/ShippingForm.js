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

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <AddressSuggestions
          token={process.env.NEXT_PUBLIC_DA_DATA_KEY}
          value={value}
          onChange={setValue}
          minChars={3}
          // defaultQuery={"г Москва"}
          delay={500}
        />
      )}

      <h1>
        {value
          ? value.data.city_kladr_id !== null
            ? JSON.stringify(value.data.city_kladr_id)
            : "Выберите другой город"
          : "Выберите город"}
      </h1>

      <button
        disabled={!value}
        className="btn-primary btn"
        onClick={() =>
          startTransition(async () => {
            const sdekId = await findSDEKById(value.data.city_kladr_id);
            const tarifs = await getSDEKAvailableTarif(
              sdekId.suggestions[0].data.cdek_id
            );
            setTarifs(tarifs);
          })
        }
      >
        найти когд города СДЭК и тариф
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
