import { getYookassaPaymentStatus } from "@/components/yookassa/yookassaApi";
import Link from "next/link";

export default async function CheckPaymentButton({ paymentId }) {
  const paymentStatus = await getYookassaPaymentStatus(paymentId);
  let buttonLabel;
  if (paymentStatus?.status == "canceled") {
    buttonLabel = "Отменён";
  } else {
    buttonLabel = (
      <Link href={paymentStatus?.confirmation.confirmation_url}>
        <button className="btn">Оплатить</button>
      </Link>
    );
  }

  return <>{buttonLabel}</>;
}
