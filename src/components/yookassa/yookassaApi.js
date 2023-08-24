"use server";

import { redirect } from "next/navigation";

export async function yookassaPaymetReq(uuid, subtotal) {
  console.log(subtotal);
  let response;
  try {
    response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          btoa(process.env.YOOMONEY_ID + ":" + process.env.YOOMONEY_API_KEY),
        "Idempotence-Key": uuid,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          value: subtotal,
          currency: "RUB",
        },
        capture: true,
        confirmation: {
          type: "redirect",
          return_url: "http://localhost:3000/checkout/payment",
        },
        description: "Заказ №123",
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.log("There was an error", error);
  }
  if (response?.ok) {
    const json = await response.json();
    console.log(json);
    if (json.status == "pending") {
      redirect(json?.confirmation.confirmation_url || "/404");
    } else if (json.status == "succeeded") {
      console.log("Успешно оплачено");
    }
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }
}

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
