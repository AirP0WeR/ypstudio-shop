import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

export default function ProductCard({ product }) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
    >
      <fugure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </fugure>
      <div className="card-body">
        <h2 className="card-title"></h2>
        {product.name}
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <p>{product.price}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
