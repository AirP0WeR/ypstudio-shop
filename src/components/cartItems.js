import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";

export function CartEntry({ cartItem: { product, quantity } }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={150}
          height={150}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>Цена: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Количество:
            <h1>{quantity}</h1>
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}

export default async function CartItems() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">В корзине</h1>

      <div className="flex flex-col items-end sm:items-center bg-slate-100 mb-3">
        <div className="my-3">
          Итого {cart?.size || 0} товаров
          <p className="font-bold">
            на сумму {formatPrice(cart?.subtotal || 0)}
          </p>
        </div>
      </div>

      {cart?.items.map((cartItem) => (
        <CartEntry cartItem={cartItem} key={cartItem.id} />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
    </div>
  );
}
