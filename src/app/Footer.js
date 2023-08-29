import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral p-6 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        <p>Yulia Perezhogina © 2017-{year}</p>

        <div>
          <Link href="/contacts">
            <span className="footer-title">Контакты</span>
          </Link>
        </div>
        {/* <div>
          <Link href="/payment">
            <span className="footer-title">Оплата</span>
          </Link>
        </div> */}
        <div>
          <Link href="/delivery">
            <span className="footer-title">Доставка</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
