import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandMMKVStorage } from "../lib/storage";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [], // { id, date, items, total, paymentMethod }

      addOrder: (order) => set({ orders: [order, ...get().orders] }), // newest first

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "nexora-orders",
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
