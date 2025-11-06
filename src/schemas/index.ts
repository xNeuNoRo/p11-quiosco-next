import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  total: z.number().min(1, "Hay errores en la orden"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
      subtotal: z.number(),
    })
  ),
});

export const orderIdSchema = z.object({
  orderId: z
    .string()
    .transform((val) => parseInt(val, 10)) // transformar a numero
    .refine((val) => val > 0, { message: "Hay errores en la orden" }), // validar que sea mayor a 0 (basicamente un numero entero positivo)
});

export const searchFormSchema = z.object({
  search: z.string().trim().min(1, "La busqueda no puede estar vacía"),
});
