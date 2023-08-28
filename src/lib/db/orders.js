"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { getCart } from "./cart";

export async function getOrders() {
  const session = await getServerSession(authOptions);
  const order = await prisma.Orders.findMany({
    where: {
      userId: session.user.id,
      paymentInfo: {
        NOT: {
          paymentStatus: "new",
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      paymentInfo: true,
    },
  });
  return order;
}

export async function getOrder() {
  const session = await getServerSession(authOptions);

  const order = await prisma.Orders.findFirst({
    where: {
      userId: session.user.id,
      paymentInfo: {
        paymentStatus: "new",
      },
    },
    include: {
      paymentInfo: true,
    },
  });
  return order;
}

export async function upOrder() {
  const session = await getServerSession(authOptions);
  const uuid = crypto.randomUUID();
  const cart = await getCart();
  const order = await getOrder();

  await prisma.Orders.upsert({
    where: { id: order?.id || session.user.id },
    update: {
      paymentInfo: {
        update: {
          total_summ: cart.subtotal,
        },
      },
      orderItems: {
        deleteMany: {},
        createMany: {
          data: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    },

    create: {
      userId: session.user.id,
      paymentInfo: {
        create: {
          uuid: uuid,
          paymentStatus: "new",
          total_summ: cart.subtotal,
        },
      },
      deliveryInfo: {
        create: {},
      },
      userOrderInfo: {
        create: {},
      },
      orderItems: {
        createMany: {
          data: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    },
  });
}

export async function updateOrderUser(name, phone, email) {
  const order = await getOrder();

  await prisma.Orders.update({
    where: { id: order?.id },
    data: {
      userOrderInfo: {
        update: {
          name,
          email,
          phone,
        },
      },
    },
  });
}

export async function updateOrderDelivery(deliveryData) {
  const order = await getOrder();

  await prisma.Orders.update({
    where: { id: order?.id },
    data: {
      deliveryInfo: {
        update: {
          deliveryMethod: deliveryData?.deliveryMethod,
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
      },
    },
  });
}

export async function updateOrderPayment(order, json) {
  await prisma.Orders.update({
    where: { id: order?.id },
    data: {
      paymentInfo: {
        update: {
          paymentStatus: json?.status,
          yooPaymentId: json?.id,
          yooPaymentCreatedAt: json?.created_at,
        },
      },
    },
  });
}
