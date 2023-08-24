"use client";
import { yookassaPaymetReq } from "@/components/yookassa/yookassaApi";

export async function PaymentForm({ uuid, subtotal }) {
  console.log(uuid);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">
        Выберите способ оплаты
      </h1>
      <button onClick={() => yookassaPaymetReq(uuid, subtotal)}>
        <div className="my-3 border-violet-600 border">
          <h1 className="text-3xl font-bold text-center my-5">yookassa</h1>
        </div>
      </button>
    </div>
  );
}
