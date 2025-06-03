import type { ThemeProps } from "@/types";
import { create } from "zustand";

interface ThemeState {
  theme: ThemeProps["theme"];
  setTheme: (theme: ThemeProps["theme"]) => void;

  sidebarTheme: ThemeProps["sidebarTheme"];
  setSidebarTheme: (sidebarTheme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme: ThemeProps["theme"]) => set({ theme }),
  sidebarTheme: "#FD6B09",
  setSidebarTheme: (sidebarTheme: string) =>
    set({ sidebarTheme: sidebarTheme }),
}));
