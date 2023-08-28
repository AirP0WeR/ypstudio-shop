import { getUser } from "@/lib/db/user";
import { getOrders } from "@/lib/db/orders";
import CheckPaymentButton from "./CheckPaymentButton";
import { formatPrice } from "@/lib/format";

export default async function Profile() {
  const user = await getUser();
  const orders = await getOrders();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-5">
      <div className="bg-blue-100">
        <h1>Профиль пользователя</h1>
        <form>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder={user?.email}
              defaultValue={user?.email}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Имя</span>
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              placeholder={user?.name}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Телефон</span>
            </label>
            <input
              type="text"
              defaultValue={user?.phonenumber}
              placeholder={user?.phonenumber}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button
            className="btn btn-primary mt-3"
            type="submit"
            variant="primary"
          >
            Обновить
          </button>
        </form>
      </div>

      <div className="bg-red-100 col-span-2">
        Заказы
        {!orders ? (
          <h1>Нет заказов</h1>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                  <th>Статус оплаты</th>
                  <th>Статус доставки</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((e) => (
                  <tr key={e.id}>
                    <th>{e.id}</th>
                    <td>{e.createdAt.toLocaleString("ru-RU")}</td>
                    <td>{formatPrice(e.paymentInfo.total_summ)}</td>
                    <td>
                      {e.paymentInfo.paymentStatus == "succeeded" ? (
                        "Оплачено"
                      ) : (
                        <CheckPaymentButton
                          paymentId={e.paymentInfo.yooPaymentId}
                        />
                      )}
                    </td>
                    <td>Не доставлено</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
