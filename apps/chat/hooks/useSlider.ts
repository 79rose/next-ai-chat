import { create } from 'zustand';

interface SliderStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSlider = create<SliderStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSlider;
