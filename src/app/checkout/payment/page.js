import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CartItems from "@/components/cartItems";

import Link from "next/link";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <ul className="steps w-full">
        <li className="step step-primary">
          <Link href="/cart">Корзина</Link>
        </li>
        <li className="step step-primary">
          <Link href="/checkout">Контакты</Link>
        </li>
        <li className="step step-primary">
          <Link href="/checkout/shipping">Доставка</Link>
        </li>
        <li className="step step-primary">Оплата</li>
      </ul>
      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
        <div>
          <h1></h1>
          <h1>Город</h1>
          <input defaultValue="Москва"></input>
          <h1>Улица</h1>
          <input></input>
          <h1>Дом</h1>
          <input></input>
          <div>
            <Link href="/checkout/payment">
              <button className="btn btn-primary">Оплатить</button>
            </Link>
          </div>
        </div>

        <CartItems />
      </div>
    </div>
  );
}
