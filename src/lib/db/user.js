import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { updateOrderUser } from "./orders";

export async function editUserProfile(formData, ...props) {
  "use server";
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  if (!name || !phone) {
    throw Error("Не хватает данных");
  }
  const user = await updateUser(name, phone);
  await updateOrderUser(name, phone, user?.email);
}

export async function editUser(formData, ...props) {
  "use server";
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  if (!name || !phone) {
    throw Error("Не хватает данных");
  }
  const user = await updateUser(name, phone);
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  } else {
    redirect("/api/auth/signin");
  }
  return user;
}

export async function updateUser(name, phone, role) {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session) {
    user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name, phonenumber: phone, role: role || "user" },
    });
  } else {
    redirect("/api/auth/signin");
  }
  return user;
}
