import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

// async function searchProducts(formData) {
//   "use server";
//   const searchQuery = formData.get("searchQuery")?.toString();

//   if (searchQuery) {
//     redirect("/search?query=" + searchQuery);
//   }
// }

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="bg-base-200">
      <div className="navbar m-auto max-w-7xl gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            <h1 className="text-xl">YPStudio Shop</h1>
            {/* <Image
              src={"/images/YP-logo.svg"}
              height={40}
              width={40}
              alt="logo"
            /> */}
          </Link>
        </div>
        {/* <div>
          <h1>{session?.user.role && (session?.user.role ? session?.user.role : "user")
          }</h1>
        </div> */}
        <div className="flex-none gap-2">
          {/* <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input-bordered input w-full min-w-[100px]"
              />
            </div>
          </form> */}
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
