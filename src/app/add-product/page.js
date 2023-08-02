import FormSubmittButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Добавить товар - YPStudio",
};

async function addProduct(formData) {
  "use server";
  const name = formData.get("name")?.toString();
  const brand = formData.get("brand")?.toString() || "main";
  const category = formData.get("category")?.toString() || "main";
  const countInStock = Number(formData.get("countInStock") || 0);
  const description = formData.get("description")?.toString() || "main";
  const imageUrl = formData.get("imageUrl")?.toString() || "main";
  const price = Number(formData.get("price") || 0);

  if (
    !name ||
    !brand ||
    !category ||
    !countInStock ||
    !description ||
    !imageUrl ||
    !price
  ) {
    throw Error("Не хватает данных");
  }

  await prisma.product.create({
    data: { name, brand, category, countInStock, description, imageUrl, price },
  });
//   redirect("/");
}

export default function AppProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">AddProduct</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Имя"
          type="text"
          className="input input-bordered mb-3 w-full"
        />
        <input
          name="brand"
          placeholder="Брэнд"
          type="text"
          className="input input-bordered mb-3 w-full"
        />
        <input
          name="category"
          placeholder="Категория"
          type="text"
          className="input input-bordered mb-3 w-full"
        />
        <input
          name="countInStock"
          placeholder="Количество на складе"
          type="number"
          className="input input-bordered mb-3 w-full"
        />

        <textarea
          name="description"
          placeholder="Описание"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          name="imageUrl"
          placeholder="Картинка"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Цена"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmittButton className="btn-block">
          Добавить продукт
        </FormSubmittButton>
      </form>
    </div>
  );
}
