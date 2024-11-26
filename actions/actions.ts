"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
    try {
        await prisma.post.create({
          data: {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string)
              .replace(/\s+/g, "-")
              .toLocaleLowerCase(),
            content: formData.get("content") as string,
            author:{
              connect: {
                  email: "example.123@gmail.com"
              }
            }
          },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code = "P2002") {
                console.log(
                    "There is a unique constraint violation, a new user cannot be created with this email."
                )
            }
        }
    }
    // Error codes of prisma
    // https://www.prisma.io/docs/orm/reference/error-reference#error-codes
  revalidatePath("/posts");
}

export async function editPost(formData: FormData, id: string) {
  await prisma.post.update({
    where: { id: id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLocaleLowerCase(),
      content: formData.get("content") as string,
    },
  });
  revalidatePath("/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id: id },
  });
  revalidatePath("/posts");
}
