import Link from "next/link";
import FormSubmittButton from "@/components/FormSubmitButton";
import CartItems from "@/components/cartItems";
import { updateUser, getUser } from "@/lib/db/user";
import { redirect } from "next/navigation";

async function editProfile(formData, ...props) {
  "use server";
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  if (!name || !phone) {
    throw Error("Не хватает данных");
  }
  const user = await updateUser(name, phone);
  redirect("/checkout/shipping");
}

export default async function CheckoutPage() {
  const user = await getUser();

  return (
    <div>
      <ul className="steps w-full">
        <li className="step step-primary">
          <Link href="/cart">Корзина</Link>
        </li>
        <li className="step step-primary">Контакты</li>
        <li className="step">Доставка</li>
        <li className="step">Оплата</li>
      </ul>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-5">
        <div>
          <form action={editProfile} className="form-control">
            <h1 className="text-3xl font-bold text-center">Контакты</h1>

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
                  Телефон в формате +79991234567
                </span>
              </label>
              <input
                required
                type="tel"
                name="phone"
                // pattern="[+]{1}[7]-{1}[0-9]{3}-[0-9]{3}-[0-9]{4}"
                pattern="[+]{1}[0-9]{1,3}[0-9]{10}"
                placeholder="+79991234567"
                defaultValue={user.phonenumber}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            {/* Форма согласия */}
            <div className="flex items-center mt-5">
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

            <FormSubmittButton className="btn w-64 mt-5">
              К выбору способа доставки
            </FormSubmittButton>
          </form>
        </div>

        <CartItems />
      </div>
    </div>
  );
}
