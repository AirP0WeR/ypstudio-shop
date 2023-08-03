import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link className="font-bold link" href="/checkout">Контактная информация</Link>
          </li>
          <li>
            <li>Доставка</li>
          </li>
          <li>Оплата</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 mt-3">
        <div>
          <h1>Контактная информация</h1>
          <h1>Почта</h1>
          <input disabled defaultValue={session.user.email}></input>
          <h1>Имя</h1>
          <input defaultValue={session.user.name}></input>
          <h1>Номер телефона</h1>
          <input defaultValue={session.user.phonenumber}></input>
          <div>
            <Link href="/checkout/shipping">
              <button className="btn btn-primary">Далее</button>
            </Link>
          </div>
        </div>

        <div className="bg-red-100">Компонент с товарами в корзине</div>
      </div>
    </div>
  );
}
