import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandMMKVStorage } from "../lib/storage";

export const useReviewStore = create(
  persist(
    (set, get) => ({
      reviews: {}, // { [productId]: [{ id, author, rating, comment, date }] }

      addReview: (productId, review) => {
        const existing = get().reviews[productId] || [];
        set({
          reviews: {
            ...get().reviews,
            [productId]: [review, ...existing], // newest first
          },
        });
      },

      getReviews: (productId) => get().reviews[productId] || [],

      getAverageRating: (productId) => {
        const list = get().reviews[productId] || [];
        if (list.length === 0) return 0;
        const sum = list.reduce((acc, r) => acc + r.rating, 0);
        return sum / list.length;
      },
    }),
    {
      name: "nexora-reviews",
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
