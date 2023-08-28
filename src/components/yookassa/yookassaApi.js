"use server";

import { redirect } from "next/navigation";
import { updateOrderPayment } from "@/lib/db/orders";
import { getCart, deleteCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";

export async function yookassaPaymetReq(order) {
  // console.log(order.paymentInfo.total_summ);
  let response;
  try {
    response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          btoa(process.env.YOOMONEY_ID + ":" + process.env.YOOMONEY_API_KEY),
        "Idempotence-Key": order.paymentInfo.uuid,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          value: order.paymentInfo.total_summ,
          currency: "RUB",
        },
        capture: true,
        confirmation: {
          type: "redirect",
          return_url: "http://localhost:3000/profile",
        },
        description: "Заказ №" + order.paymentInfo.uuid,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.log("There was an error", error);
  }

  if (response?.ok) {
    const json = await response.json();
    if (json.status == "pending") {
      // записать id created_at юкассы

      // меняем статус оплаты на pending
      await updateOrderPayment(order, json);
      const cart = await getCart();
      // удаляем корзину
      await deleteCart(cart?.id);

      redirect(json?.confirmation.confirmation_url || "/404");
    } else if (json.status == "succeeded") {
      console.log("Успешно оплачено");
    }
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }
}

export async function getYookassaPaymentStatus(id) {
  let response;
  try {
    response = await fetch(`https://api.yookassa.ru/v3/payments/${id}`, {
      headers: {
        Authorization:
          "Basic " +
          btoa(process.env.YOOMONEY_ID + ":" + process.env.YOOMONEY_API_KEY),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  } catch (error) {
    console.log("There was an error", error);
  }
  if (response?.ok) {
    const json = await response.json();
    // Обновить статус платежа в базе
    await prisma.PaymentInfo.update({
      where: {
        yooPaymentId: id
      },
      data: {
        paymentStatus: json?.status
      }
    })
    return json
  }

}

// Отправка запроса на юКассу
// Получаем ответ

// меняем статус оплаты на pending
// удаляем корзину
// редирект делаем на страницу заказа (сделать страницу заказа с кнопкой проверки статуса оплаты при нажатии)
// Записываем данные о платеже из ответа

// {
//     id: '2c719049-000f-5000-a000-14fbdbdf094c',
//     status: 'pending',
//     amount: { value: '100.00', currency: 'RUB' },
//     description: 'Заказ №1123',
//     recipient: { account_id: '244436', gateway_id: '2107931' },
//     created_at: '2023-08-18T14:13:29.268Z',
//     confirmation: {
//       type: 'redirect',
//       confirmation_url: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2c719049-000f-5000-a000-14fbdbdf094c'
//     },
//     test: true,
//     paid: false,
//     refundable: false,
//     metadata: {}
//   }
