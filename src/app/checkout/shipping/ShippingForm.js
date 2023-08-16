"use client";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useState, useTransition, useEffect } from "react";
import { getSDEKAvailableTarif } from "@/components/sdekAPI/getAvailableTarif";
import { findSDEKById } from "@/components/daDataAPI/findById";
import { getSDEKPVZ } from "@/components/sdekAPI/getPVZ";
import dynamic from "next/dynamic";

const OpenStreetMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export function ShippingForm() {
  const [value, setValue] = useState();
  const [address, setaddress] = useState();
  const [tarifs, setTarifs] = useState();
  const [tarif, setTarif] = useState();
  const [isPending, startTransition] = useTransition();
  const [isClient, setIsClient] = useState(false);
  const [cityName, setCityName] = useState();
  const [isCity, setCity] = useState(false);
  const [pvz, setPvz] = useState();
  const [sdekId, setSdekId] = useState();

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
            inputProps={{ disabled: isCity, placeholder: "Выберите город" }}
            renderOption={(suggestion) => {
              return suggestion.data.city;
            }}
          />
        )}
        {!isCity && (
          <button
            disabled={!value}
            className="btn-primary btn ml-5 w-48 justify-self-end"
            onClick={() =>
              startTransition(async () => {
                console.log(value);
                const sdekId = await findSDEKById(value.data.city_kladr_id);

                if (sdekId.suggestions.length !== 0) {
                  setSdekId(sdekId.suggestions[0].data.cdek_id);
                  const tarifs = await getSDEKAvailableTarif(
                    sdekId.suggestions[0].data.cdek_id
                  );
                  setTarifs(tarifs);
                  setCity(true);
                  setCityName(value.data.city);
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
              setTarif(null);
              setPvz(null);
              setCityName(null);
              setaddress(null);
            }}
          >
            Изменить город
          </button>
        )}
      </div>
      <div className="flex">
        {isCity && (
          <h1 className="font-bold my-5 grow">
            Город доставки -
            {" " +
              value.data.region_with_type +
              ", " +
              value.data.city_with_type}
          </h1>
        )}
        {isPending && (
          <span className="loading loading-spinner loading-sm justify-self-end" />
        )}
      </div>

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
                    // onChange={(e) => {
                    //   setTarif(e.target.value);
                    // }}
                    onClick={(e) =>
                      startTransition(async () => {
                        setTarif(e.target.value);
                        if (e.target.value == 483 || e.target.value == 486) {
                          const pvzs = await getSDEKPVZ(
                            sdekId,
                            (e.target.value == 486 && "POSTMAT") || "PVZ"
                          );
                          setPvz(pvzs);
                        } else {
                          null;
                        }
                      })
                    }
                  />
                </label>
              </div>
            )
        )}

      <div>
        {tarif == 482 && (
          <div>
            <h1>Выбран тариф 482 Делаем блок выбора адреса</h1>

            {isClient && (
              <AddressSuggestions
                token={process.env.NEXT_PUBLIC_DA_DATA_KEY}
                value={address}
                onChange={setaddress}
                minChars={3}
                hintText={"Выберите вариант или продолжите ввод"}
                delay={500}
                filterLocations={[{ city: cityName }]}
              />
            )}

            <textarea
              placeholder="Комментарий к заказу (например, запасной номер телефона)"
              className="textarea textarea-bordered textarea-md w-full mt-5"
            ></textarea>
          </div>
        )}

        {tarif == 483 && (
          <div >
            <OpenStreetMap longitude={pvz[0].location.longitude} latitude={pvz[0].location.latitude}/>
            {/* <OpenStreetMap /> */}
            <h1>Выбран тариф 483</h1>
          </div>
        )}

        {tarif == 486 && <h1>Выбран тариф 486{JSON.stringify(pvz)}</h1>}
      </div>
    </div>
  );
}
