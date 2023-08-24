"use client";
import { upOrder } from "@/lib/db/orders";

export default function Page() {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => upOrder()}>
        Записать
      </button>
      <button className="btn btn-primary">Удалить</button>
    </div>
  );
}
