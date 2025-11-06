"use server";

import { productFormSchema } from "@/src/schemas";
import { prisma } from "@/src/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProduct(data: unknown, id: number) {
  const result = productFormSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.issues };
  }

  await prisma.product.update({
    where: { id },
    data: result.data,
  });
  revalidatePath("/admin/products"); // Revalidar la página de la lista de productos
}
