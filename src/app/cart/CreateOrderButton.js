"use client";
import Link from "next/link";
import { upOrder } from "@/lib/db/orders";
import { useTransition } from "react";

export function CreateOrderButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Link href="/checkout">
      <button
        className="btn-primary btn sm:w-[200px]"
        onClick={() =>
          startTransition(async () => {
            await upOrder();
          })
        }
      >
        Оформить заказ
      </button>
      {isPending && <span className="loading loading-spinner loading-sm" />}
    </Link>
  );
}
