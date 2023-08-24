"use server";
import { redirect } from "next/navigation";
import { upsertUserDelivery } from "@/lib/db/deliveryInfo";
import { updateOrderDelivery } from "@/lib/db/orders";

export async function submitDelivery({
  value,
  sdekPvz,
  address,
  deliveryCityIds,
  tarif,
}) {


  const deliveryData = {
    // данные о городе, стргане герионе
    deliveryMethod: tarif || null,
    country: value?.data.country || null,
    country_iso_code: value?.data.country_iso_code || null,
    region_fias_id: value?.data.region_fias_id || null,
    region_kladr_id: value?.data.region_kladr_id || null,
    region_with_type: value?.data.region_with_type || null,
    city_fias_id: value?.data.city_fias_id || null,
    city_kladr_id: value?.data.city_kladr_id || null,
    city_with_type: value?.data.city_with_type || null,
    // данные о поставщиках
    city_boxberry_id: deliveryCityIds?.suggestions[0].data.boxberry_id || null,
    city_cdek_id: deliveryCityIds?.suggestions[0].data.cdek_id || null,
    city_dpd_id: deliveryCityIds?.suggestions[0].data.dpd_id || null,
    // Данные выбранном о ПВЗ
    sdek_pvz_code: sdekPvz?.code || null,
    sdek_pvz_uuid: sdekPvz?.uuid || null,
    sdek_pvz_work_time: sdekPvz?.work_time || null,
    sdek_pvz_type: sdekPvz?.type || null,
    sdek_pvz_address_full: sdekPvz?.location.address_full || null,
    sdek_pvz_longitude: sdekPvz?.location.longitude || null,
    sdek_pvz_latitude: sdekPvz?.location.latitude || null,
    // Данные о выбраном адресе
    address_unrestricted_value: address?.unrestricted_value || null,
    address_postal_code: address?.data.postal_code || null,
    address_geo_lat: parseFloat(address?.data.geo_lat) || null,
    address_geo_lon: parseFloat(address?.data.geo_lon) || null,
    address_city: address?.data.city || null,
  };
  await upsertUserDelivery(deliveryData);
  await updateOrderDelivery(deliveryData);

  redirect("/checkout/payment");
}
