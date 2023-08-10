import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

export default function ProductCard({ product }) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={"/products/" + product.id} className="">
      {/* <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"></h2>
        {product.name}
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <p>{product.price}</p>
        <PriceTag price={product.price} />
      </div> */}

      <div className="relative">


        <div className="flex items-center justify-center absolute top-0 right-0 left-0 bottom-0 mx-6">
          <Image
            className="rounded-full"
            width={700}
            height={100}
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="h-1/5 flex flex-col justify-center absolute top-0 right-0 left-0 bottom-0 bg-white">
          <h1 className="ml-5 font-bold">{product.name}</h1>
          <PriceTag price={product.price}  className={"ml-5 font-bold bg-white"}/>
        </div>
        <div className="h-1/5 flex items-center justify-center absolute right-0 left-0 bottom-0 bg-black opacity-40">
          Hello
        </div>
        <Image
          className=""
          width={800}
          height={400}
          src="/images/products/default-bg.jpg"
          alt={product.name}
        />
      </div>
    </Link>
  );
}
