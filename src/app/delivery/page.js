import Link from "next/link";
export default function Delivery() {
  return (
    <div>
      <div>
        <h1 className="text-3xl">Доставка</h1>
      </div>
      <br />
      <p>
        Доставка заказов осуществляется силами курьерской компании-партнера. В
        случае любых сложностей с доставкой напишите нам на адрес&ensp;
        <Link className="link" href="mailto:info@ypstudio.ru">
          info@ypstudio.ru
        </Link>
        .
      </p>
      <p>
        Сроки передачи заказов курьерским службам могут занять до 5-х рабочих
        дней, ввиду необходимости изготовления заказа.
      </p>
      <br />

      <p>
        <b>Внимание!</b>
        <br />
        Отказаться от оплаченного заказа — невозможно!
      </p>
    </div>
  );
}
