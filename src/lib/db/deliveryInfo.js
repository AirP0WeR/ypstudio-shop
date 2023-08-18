import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { getCart } from "./cart";

export async function getDeliveryInfo() {
  const cart = await getCart();
  const deliveryInfoPrisma = await prisma.DeliveryData.findFirst({
    where: { cartId: cart.id },
  });
  if (!deliveryInfoPrisma) {
    return null;
  }
  return {
    deliveryInfoPrisma,
  };
}

export async function createDeliveryInfo(deliveryData) {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  const deliveryInfoPrisma = await prisma.DeliveryData.create({
    data: {
      cartId: cart.id,
      userId: session.user.id,
      country: deliveryData?.country,
      country_iso_code: deliveryData?.country_iso_code,
      region_fias_id: deliveryData?.region_fias_id,
      region_kladr_id: deliveryData?.region_kladr_id,
      region_with_type: deliveryData?.region_with_type,
      city_fias_id: deliveryData?.city_fias_id,
      city_kladr_id: deliveryData?.city_kladr_id,
      city_with_type: deliveryData?.city_with_type,
      // данные о поставщиках
      city_boxberry_id: Number(deliveryData?.city_boxberry_id),
      city_cdek_id: Number(deliveryData?.city_cdek_id),
      city_dpd_id: Number(deliveryData?.city_dpd_id),
      // Данные выбранном о ПВЗ
      sdek_pvz_code: deliveryData?.sdek_pvz_code,
      sdek_pvz_uuid: deliveryData?.sdek_pvz_uuid,
      sdek_pvz_work_time: deliveryData?.sdek_pvz_work_time,
      sdek_pvz_type: deliveryData?.sdek_pvz_type,
      sdek_pvz_address_full: deliveryData?.sdek_pvz_address_full,
      sdek_pvz_longitude: deliveryData?.sdek_pvz_longitude,
      sdek_pvz_latitude: deliveryData?.sdek_pvz_latitude,
      // Данные о выбраном адресе
      address_unrestricted_value: deliveryData?.address_unrestricted_value,
      address_postal_code: Number(deliveryData?.address_postal_code),
      address_geo_lat: deliveryData?.address_geo_lat,
      address_geo_lon: deliveryData?.address_geo_lon,
      address_city: deliveryData?.address_city,
    },
  });

  return {
    deliveryInfoPrisma,
  };
}

export async function udateDeliveryInfo(deliveryData) {
  const cart = await getCart();

  const deliveryInfoPrisma = await prisma.DeliveryData.update({
    where: { cartId: cart.id },
    data: {
      country: deliveryData?.country,
      country_iso_code: deliveryData?.country_iso_code,
      region_fias_id: deliveryData?.region_fias_id,
      region_kladr_id: deliveryData?.region_kladr_id,
      region_with_type: deliveryData?.region_with_type,
      city_fias_id: deliveryData?.city_fias_id,
      city_kladr_id: deliveryData?.city_kladr_id,
      city_with_type: deliveryData?.city_with_type,
      // данные о поставщиках
      city_boxberry_id: Number(deliveryData?.city_boxberry_id),
      city_cdek_id: Number(deliveryData?.city_cdek_id),
      city_dpd_id: Number(deliveryData?.city_dpd_id),
      // Данные выбранном о ПВЗ
      sdek_pvz_code: deliveryData?.sdek_pvz_code,
      sdek_pvz_uuid: deliveryData?.sdek_pvz_uuid,
      sdek_pvz_work_time: deliveryData?.sdek_pvz_work_time,
      sdek_pvz_type: deliveryData?.sdek_pvz_type,
      sdek_pvz_address_full: deliveryData?.sdek_pvz_address_full,
      sdek_pvz_longitude: deliveryData?.sdek_pvz_longitude,
      sdek_pvz_latitude: deliveryData?.sdek_pvz_latitude,
      // Данные о выбраном адресе
      address_unrestricted_value: deliveryData?.address_unrestricted_value,
      address_postal_code: Number(deliveryData?.address_postal_code),
      address_geo_lat: deliveryData?.address_geo_lat,
      address_geo_lon: deliveryData?.address_geo_lon,
      address_city: deliveryData?.address_city,
    },
  });

  return {
    deliveryInfoPrisma,
  };
}
