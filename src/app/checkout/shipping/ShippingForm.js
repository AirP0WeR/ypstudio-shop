"use client";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useState, useTransition, useEffect } from "react";
import { getSDEKAvailableTarif } from "@/components/sdekAPI/getAvailableTarif";
import { findSDEKById } from "@/components/daDataAPI/findById";

export function ShippingForm() {
  const [value, setValue] = useState();
  const [tarifs, setTarifs] = useState();
  const [tarif, setTarif] = useState();
  const [isPending, startTransition] = useTransition();
  const [isClient, setIsClient] = useState(false);
  const [isCity, setCity] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">
        Выберите способ доставки
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center my-5">
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
        {!isCity && (
          <button
            disabled={!value}
            className="btn-primary btn ml-5 w-48 justify-self-end"
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
            Сохранить
          </button>
        )}

        {isCity && (
          <button
            className="btn-primary btn ml-5 w-48 justify-self-end"
            disabled={!isCity}
            onClick={() => {
              setCity(false);
              setValue(null);
              setTarifs(null);
            }}
          >
            Изменить город
          </button>
        )}
      </div>

      {isPending && <span className="loading loading-spinner loading-sm" />}

      {isCity && (
        <h1 className="font-bold my-5">
          Город доставки -
          {" " + value.data.region_with_type + ", " + value.data.city_with_type}
        </h1>
      )}

      {tarifs &&
        tarifs.tariff_codes.map(
          (e) =>
            (e.tariff_code === 482 ||
              e.tariff_code === 483 ||
              e.tariff_code === 486) && (
              <div
                className="my-3 p-3 border-violet-600 border"
                key={e.tariff_code}
              >
                <label className="label cursor-pointer">
                  <span className="label-text">
                    {"Стоимость " +
                      e.delivery_sum +
                      " руб" +
                      " " +
                      e.tariff_code +
                      " " +
                      e.tariff_name}
                  </span>

                  <input
                    type="radio"
                    name="tarif"
                    className="radio checked:bg-red-500"
                    id={e.tariff_code}
                    value={e.tariff_code}
                    onChange={(e) => {
                      setTarif(e.target.value);
                    }}
                  />
                </label>
              </div>
            )
        )}

      <h1>Тариф + {tarif}</h1>
      
    </div>
  );
}
