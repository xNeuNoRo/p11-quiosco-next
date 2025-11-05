"use server";
import { prisma } from "@/src/lib/db";
import { orderIdSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

// Todas las acciones del servidor son asincronas
export async function completeOrder(formData: FormData) {
  const data = {
    orderId: formData.get("order_id"),
  };
  const result = orderIdSchema.safeParse(data);
  if (!result.success) return;

  try {
    await prisma.order.update({
      where: {
        id: result.data.orderId,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });
    revalidatePath("/admin/orders"); // refetch de la pagina de ordenes
  } catch (err) {
    console.log(err);
  }
}
