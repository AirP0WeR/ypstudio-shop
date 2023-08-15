import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

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
