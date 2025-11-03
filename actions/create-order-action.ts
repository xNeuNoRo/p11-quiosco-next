"use server";
import { prisma } from "@/src/lib/db";
import { orderSchema } from "@/src/schemas";

// Todas las acciones del servidor son asincronas
export async function createOrder(data: unknown) {
  const result = await orderSchema.safeParse(data);
  if (!result.success)
    return {
      errors: result.error.issues,
    };

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((item) => ({
            // orderId no es necesario porque prisma lo añade automaticamente
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}
