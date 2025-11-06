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

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre del producto no puede ir vacio" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Precio no válido" })
    .or(z.number().min(1, { message: "El precio es obligatorio" })),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La categoría es obligatoria" })
    .or(z.number().min(1, { message: "La categoría es obligatoria" })),
  image: z
    .string()
    .min(1, { message: "La imagen del producto es obligatoria" }),
});
