// import { authOptions } from "../../api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import Link from "next/link";
import { ShippingForm } from "./ShippingForm";


export default async function CheckoutPage() {
  // const session = await getServerSession(authOptions);


  // const tarif = await getSDEKTarifByCode( 44 );
  // console.log(tarif);

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link className="link" href="/checkout">
              Контактная информация
            </Link>
          </li>
          <li>
            <Link className="font-bold link" href="/checkout">
              Доставка
            </Link>
          </li>
          <li>Оплата</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <ShippingForm  />

          <Link href="/checkout/payment">
            <button className="btn btn-primary">Далее</button>
          </Link>
        </div>

        <div className="bg-red-100">Компонент с товарами в корзине</div>
      </div>
    </div>
  );
}
