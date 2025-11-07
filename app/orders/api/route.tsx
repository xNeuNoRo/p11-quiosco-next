import { prisma } from "@/src/lib/db";

// Forzar que esta ruta sea dinamica
// asi siempre se obtienen datos actualizados sin el cacheo intenso de nextjs
export const dynamic = "force-dynamic";

export async function GET() {
  const orders = await prisma.order.findMany({
    take: 5,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return Response.json(orders);
}
