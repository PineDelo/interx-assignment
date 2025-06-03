import { create } from "zustand";

interface AlertState {
  alertMessage: string;
   setAlertMessage: (message: string) => void;

  isAlertError: boolean;
  setAlertError: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alertMessage: "",
  setAlertMessage: (message: string) => set({ alertMessage: message }),

  isAlertError: false,
  setAlertError: () => set((state) => ({ isAlertError: !state.isAlertError })),
}));
