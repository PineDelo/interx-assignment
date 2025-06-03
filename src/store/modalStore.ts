import { create } from "zustand";

interface ModalState {
  isSettingModal: boolean;
  setSettingModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isSettingModal: false,
  setSettingModal: () =>
    set((state) => ({ isSettingModal: !state.isSettingModal })),
}));
