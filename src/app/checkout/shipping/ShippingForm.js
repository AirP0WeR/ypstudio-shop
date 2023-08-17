"use client";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useState, useTransition, useEffect } from "react";
import { getSDEKAvailableTarif } from "@/components/sdekAPI/getAvailableTarif";
import { findSDEKById } from "@/components/daDataAPI/findById";
import { getSDEKPVZ } from "@/components/sdekAPI/getPVZ";
import PriceTag from "@/components/PriceTag";
import { submitDelivery } from "./submitDelivery";
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
  const [pvzs, setPvzs] = useState();
  const [sdekId, setSdekId] = useState();
  const [sdekPvz, setSdekPvz] = useState();

  function confirmSdekPvz(id) {
    setSdekPvz(id);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">
        Выберите способ доставки
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
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
              setPvzs(null);
              setCityName(null);
              setaddress(null);
              setSdekId(null);
              setSdekPvz(null);
            }}
          >
            Изменить город
          </button>
        )}
      </div>
      <div className="flex my-4">
        {isCity && (
          <h1 className="text-lg font-bold grow">
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
                <label className="flex justify-between items-center cursor-pointer p-2">
                  {e.tariff_code === 482 && (
                    <h1 className="font-bold grow ">СДЭК, до двери</h1>
                  )}
                  {e.tariff_code === 483 && (
                    <h1 className="font-bold grow">СДЭК, в пункт выдачи</h1>
                  )}
                  {e.tariff_code === 486 && (
                    <h1 className="font-bold grow">СДЭК, в постамат</h1>
                  )}

                  <h1 className=" mx-3">Цена:</h1>
                  <PriceTag price={e.delivery_sum} className="mr-3" />

                  <input
                    type="radio"
                    name="tarif"
                    className="radio checked:bg-red-500"
                    id={e.tariff_code}
                    value={e.tariff_code}
                    onClick={(e) =>
                      startTransition(async () => {
                        setTarif(e.target.value);
                        if (e.target.value == 483 || e.target.value == 486) {
                          const pvzs = await getSDEKPVZ(
                            sdekId,
                            (e.target.value == 486 && "POSTMAT") || "PVZ"
                          );
                          setPvzs(pvzs);
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

      {tarif == 482 && (
        <div className="my-3 p-3 border-violet-600 border">
          <h1 className="text-lg font-bold mb-5">Адрес доставки</h1>
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

          <div className="flex items-center">
            <textarea
              placeholder="Комментарий к заказу (например, запасной номер телефона)"
              className="textarea textarea-bordered textarea-md w-full mt-5 mr-5"
            ></textarea>
            <button className="btn btn-primary mt-2">К оплате</button>
          </div>
        </div>
      )}

      {(tarif == 483 || tarif == 486) && (
        <div>
          {!sdekPvz && (
            <OpenStreetMap
              pvzs={pvzs}
              city={value}
              stateFunction={confirmSdekPvz}
            />
          )}

          {sdekPvz && (
            <div className="my-3 p-3 border-violet-600 border">
              <div className="flex justify-between">
                <h1 className="text-lg font-bold">Выбран пункт выдачи</h1>
                <button
                  className="underline text-sm"
                  onClick={() => setSdekPvz(false)}
                >
                  Изменить пункт выдачи
                </button>
              </div>

              <h1 className="text-lg mt-2">{sdekPvz.location.address_full}</h1>
              <h1 className="text-sm">{sdekPvz.work_time}</h1>
              <div className="flex items-center">
                <textarea
                  placeholder="Комментарий к заказу (например, запасной номер телефона)"
                  className="textarea textarea-bordered textarea-md w-full mt-5 mr-5"
                ></textarea>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => submitDelivery("sadf")}
                >
                  К оплате
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
