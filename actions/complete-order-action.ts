"use server";
import { prisma } from "@/src/lib/db";
import { orderIdSchema } from "@/src/schemas";
import { ActionState } from "@/src/types";

// Todas las acciones del servidor son asincronas
export async function completeOrder(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ message: string }>> {
  const data = {
    orderId: formData.get("order_id"),
  };
  const result = orderIdSchema.safeParse(data);
  if (!result.success) return { status: "error", error: "Orden inválida" };

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
    // revalidatePath("/admin/orders"); // refetch de la pagina de ordenes
    return {
      status: "success",
      data: {
        message: "Orden completada exitosamente",
      },
    };
  } catch (err) {
    console.log(err);
    return { status: "error", error: "Error al completar la orden" };
  }
}
