import { ContactForm } from "./ContactForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Contacts() {
  const session = await getServerSession(authOptions);

  return (
    <div
      className="flex flex-col w-full bg-slate-300 h-full items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('/images/contacts/contacts.jpg')`,
        backgroundPosition: "center",
      }}
    >
      <ContactForm session={session?.user} />
      <div className="overflow-x-auto w-full sm:w-3/4 md:w-1/2 border bg-white">
        <table className="table">
          <tbody>
            <tr>
              <td>ФИО</td>
              <td className="font-bold ">Пережогина Юлия Сергеевна</td>
            </tr>
            <tr>
              <td>инн:</td>
              <td className="font-bold">770870161830</td>
            </tr>
            <tr>
              <td>email:</td>
              <td className="font-bold link">
                <a href="mailto:yp@ypstudio.ru">yp@ypstudio.ru</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
