import Link from "next/link";
import Image from "next/image";
export default function NotFoundPage() {
  return (
    <div className="grid w-full justify-center relative">
      <div className="grid justify-center">
        <h1 className="text-center text-5xl my-3">error 404</h1>
        <h3 className="text-center">Похоже ты заблудился</h3>
        <p>страница на которуюты хочешь попать недоступна!</p>
        <Link href="/" className="btn my-3">
          Домой
        </Link>
      </div>
      <Image
        className=""
        src="/images/404.gif"
        alt="404"
        width={800}
        height={400}
      />
    </div>
    // <section class="page_404">
    //   <div class="container">
    //     <div class="row">
    //       <div class="col-sm-12 ">
    //         <div class="col-sm-10 col-sm-offset-1  text-center">
    //           <div class="four_zero_four_bg">
    //             <h1 class="text-center ">404</h1>
    //           </div>

    //           <div class="contant_box_404">
    //             <h3 class="h2">Похоже ты заблудился</h3>

    //             <p>страница на которуюты хочешь попать недоступна!</p>

    //             <Link href="/" class="link_404">
    //               Домой
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
