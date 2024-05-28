import { create } from 'zustand';

interface SettingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSettingModal = create<SettingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSettingModal;
