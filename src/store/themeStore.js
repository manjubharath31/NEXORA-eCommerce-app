import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: "light",

      toggleTheme: () =>
        set({
          mode: get().mode === "light" ? "dark" : "light",
        }),
    }),
    {
      name: "nexora-theme",
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
