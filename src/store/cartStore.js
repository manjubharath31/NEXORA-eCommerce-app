import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandMMKVStorage } from "../lib/storage";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { id, title, price, image, quantity }

      addToCart: (product) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) return get().removeFromCart(id);
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "nexora-cart",
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
