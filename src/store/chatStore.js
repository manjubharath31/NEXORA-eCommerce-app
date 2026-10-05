import { create } from "zustand";
import { getApiBaseUrl } from "../lib/apiBase";
import { useCartStore } from "./cartStore"; // match your real file name and export
import { useOrderStore } from "./orderStore";
import { useWishlistStore } from "./wishlistStore";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm your NEXORA assistant. Ask me anything about products or your orders.",
};

const buildContext = () => {
  const cart = useCartStore.getState().items ?? [];
  const orders = useOrderStore.getState().orders ?? [];
  const wishlist = useWishlistStore.getState().items ?? []; // check the field name

  return {
    cart: cart.map((i) => ({
      name: i.title ?? i.name,
      price: i.price,
      quantity: i.quantity ?? i.qty ?? 1,
    })),
    orders: orders.map((o) => ({
      id: o.id,
      status: o.status,
      total: o.total,
      date: o.date ?? o.createdAt,
    })),
    wishlist: wishlist.map((p) => ({
      name: p.title ?? p.name,
      price: p.price,
      category: p.category,
    })),
  };
};

export const useChatStore = create((set, get) => ({
  messages: [
    {
      role: "assistant",
      content:
        "Hi! I'm your NEXORA assistant. Ask me anything about products or your orders.",
    },
  ],
  isSending: false,

  sendMessage: async (text) => {
    const userMessage = { role: "user", content: text };
    set({ messages: [...get().messages, userMessage], isSending: true });

    const attempt = async (retriesLeft) => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: get().messages,
            context: buildContext(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (retriesLeft > 0) {
            await new Promise((r) => setTimeout(r, 1500));
            return attempt(retriesLeft - 1);
          }
          throw new Error("Request failed");
        }

        set({
          messages: [
            ...get().messages,
            { role: "assistant", content: data.reply },
          ],
          isSending: false,
        });
      } catch (err) {
        if (retriesLeft > 0) {
          await new Promise((r) => setTimeout(r, 1500));
          return attempt(retriesLeft - 1);
        }
        set({
          messages: [
            ...get().messages,
            {
              role: "assistant",
              content: "I couldn't connect. Please try again.",
            },
          ],
          isSending: false,
        });
      }
    };

    await attempt(2);
  },

  clearChat: () => set({ messages: [WELCOME_MESSAGE] }),
}));
