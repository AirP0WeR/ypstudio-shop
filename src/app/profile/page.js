import { getUser } from "@/lib/db/user";
import { getOrders } from "@/lib/db/orders";
import CheckPaymentButton from "./CheckPaymentButton";
import { formatPrice } from "@/lib/format";
import FormSubmittButton from "@/components/FormSubmitButton";
import { editUser } from "@/lib/db/user";

export default async function Profile() {
  const user = await getUser();
  const orders = await getOrders();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-5">
      <div className="">
        <h1 className="text-3xl font-bold ">Профиль пользователя</h1>
        <form action={editUser} className="form-control">
          {/* Форма Почта */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-sm mt-3">E-Mail</span>
            </label>
            <input
              readOnly={true}
              name="email"
              type="text"
              placeholder="Емейл"
              defaultValue={user.email}
              className="input input-bordered w-full max-w-xs bg-slate-100"
            />
          </div>
          {/* Форма ФИО */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-sm mt-3">ФИО</span>
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="ФИО"
              defaultValue={user.name}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* Форма телефона */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-sm mt-3">
                Телефон в формате 79991234567
              </span>
            </label>
            <input
              required
              type="tel"
              name="phone"
              // pattern="[+]{1}[7]-{1}[0-9]{3}-[0-9]{3}-[0-9]{4}"
              pattern="[0-9]{1,3}[0-9]{10}"
              placeholder="79991234567"
              defaultValue={user.phonenumber}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* Форма согласия */}
          <div className="flex items-center mt-5 max-w-xs">
            <input
              required
              type="checkbox"
              className="checkbox mr-3"
              name="rules"
              value="yes"
            />
            <h1 className="label-text">
              Я согласен на обработку персональных данных, а также с условиями
              оферты.
            </h1>
          </div>
          <FormSubmittButton className="btn w-full max-w-xs mt-5">
            Сохранить
          </FormSubmittButton>
        </form>
      </div>

      <div className="col-span-2">
        <h1 className="text-3xl font-bold text-center">Заказы</h1>
        {!orders ? (
          <h1 className="text-3xl font-bold text-center">Нет заказов</h1>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                  <th>Статус оплаты</th>
                  {/* <th>Статус доставки</th> */}
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
                    {/* <td>Не доставлено</td> */}
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
