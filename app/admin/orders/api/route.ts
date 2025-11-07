import { prisma } from "@/src/lib/db";

// Forzar que esta ruta sea dinamica
// asi siempre se obtienen datos actualizados sin el cacheo intenso de nextjs
export const dynamic = "force-dynamic";

// Hay que exportar la funcion como un metodo HTTP para que Next la reconozca como endpoint
// Todo esto es del servidor, no del cliente, por ende es seguro hacer consultas a la base de datos aqui
export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
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
