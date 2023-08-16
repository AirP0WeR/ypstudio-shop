import Link from "next/link";
import { ShippingForm } from "./ShippingForm";
import CartItems from "@/components/cartItems";
import { updateUser, getUser } from "@/lib/db/user";

export default async function CheckoutPage() {
  return (
    <div>
      <ul className="steps w-full">
        <li className="step step-primary">
          <Link href="/cart">Корзина</Link>
        </li>
        <li className="step step-primary">
          <Link href="/checkout">Контакты</Link>
        </li>
        <li className="step step-primary">Доставка</li>
        <li className="step">Оплата</li>
      </ul>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-5">
        <ShippingForm />

        <CartItems />
      </div>
    </div>
  );
}
