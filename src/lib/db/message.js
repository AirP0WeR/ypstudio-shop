"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";

export async function createMessage(dbMessageData) {
  let message;
  try {
    message = await prisma.Messages.create({
      data: {
        name: dbMessageData?.name,
        email: dbMessageData?.email,
        message: dbMessageData?.message,
        userId: dbMessageData?.id,
      },
    });
  } catch (error) {
    console.log("There was an error", error);
  }
}
