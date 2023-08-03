import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

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
            <Link className="link" href="/checkout">
              Доставка
            </Link>
          </li>
          <li>
            <Link className="font-bold link" href="/checkout">
              Оплата
            </Link>
          </li>
        </ul>
      </div>
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

        <div className="bg-red-100">Компонент с товарами в корзине</div>
      </div>
    </div>
  );
}
