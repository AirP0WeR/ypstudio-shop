'use server'
import Link from "next/link";

export async function yookassa() {
  let response;
  try {
    response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          btoa(process.env.YOOMONEY_ID + ":" + process.env.YOOMONEY_API_KEY),
        "Idempotence-Key": "sdkjfhasasdfasddkjhfl",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          value: "100.00",
          currency: "RUB",
        },
        capture: true,
        confirmation: {
          type: "redirect",
          return_url: "https://ypstudio.ru",
        },
        description: "Заказ №1123",
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.log("There was an error", error);
  }
  if (response?.ok) {
    return response.json();
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }

  return response.json();
}

export default async function Page() {
  const data = await yookassa();
  return (
    <div>
      <Link href={data?.confirmation.confirmation_url}>
        <h1>Ссылка</h1>
        <h1>{JSON.stringify(data)}</h1>
        {console.log(data)}
      </Link>
    </div>
  );
}
