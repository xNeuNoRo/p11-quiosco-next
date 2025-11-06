import { Order, OrderProducts, Product } from "../lib/prisma/generated/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  // Order inicial // Tabla pivote
  orderProducts: (OrderProducts & {
    // OrderProducts tiene el atributo adicional (quantity) + ambos IDs (orderId y productId) y el producto relacionado
    product: Product; // y dentro de esta tabla pivote, el producto relacionado
  })[]; // Como array de productos de la orden obviamente
};

export type ActionState<TData = unknown> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data?: TData }
  | { status: "error"; error: string };
