import CartItems from "@/components/cartItems";
import { PaymentForm } from "./PaymentForm";
import Link from "next/link";
import { getPaymentInfo, createPaymentInfo } from "@/lib/db/payment";
import { getCart } from "@/lib/db/cart";

export default async function CheckoutPage() {
  // const paymentInfo = (await getPaymentInfo()) ?? (await createPaymentInfo());
  // const cart = await getCart();

  // console.log(paymentInfo.uuid);
  // console.log(cart.subtotal);

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-5">
        {/* <PaymentForm uuid={paymentInfo.uuid} subtotal={cart.subtotal}/> */}

        <CartItems />
      </div>
    </div>
  );
}
