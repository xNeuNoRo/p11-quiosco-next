import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { OrderItem } from "./types";
import { Product } from "./lib/prisma/generated/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    order: [],
    addToOrder: (product) => {
      const { categoryId: _c, image: _i, ...data } = product;
      let order: OrderItem[] = [];

      if (get().order.find((item) => item.id === product.id)) {
        order = get().order.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * product.price,
              }
            : item
        );
      } else {
        order = [
          ...get().order,
          {
            ...data,
            quantity: 1,
            subtotal: 1 * product.price,
          },
        ];
      }

      set(() => ({
        order,
      }));
    },
    increaseQuantity: (id) => {
      set((state) => ({
        order: state.order.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        ),
      }));
    },
    decreaseQuantity: (id) => {
      if (get().order.find((item) => item.id === id)?.quantity === 1) return;
      const order = get().order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price,
            }
          : item
      );
      set(() => ({
        order,
      }));
    },
    removeItem: (id) => {
      set((state) => ({
        order: state.order.filter((item) => item.id !== id),
      }));
    },
  }))
);
