import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isModalOpen: boolean;
  toggleTheme: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  isModalOpen: false,
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
