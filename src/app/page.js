import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="grid justify-items-center">
        <Image src={"/images/bicycle_stickers.svg"} height={400} width={400} alt="Именные наклейки" className="bg-black"></Image>
      </div>

      <div className="mt-10 grid justify-items-center grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
