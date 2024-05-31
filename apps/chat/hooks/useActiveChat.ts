import { create } from 'zustand';

interface ActiveChatStore {
  activeChat: string;
  setActiveChat: (activeChat: string) => void;
}

const useActiveChatStore = create<ActiveChatStore>((set) => ({
  activeChat: '',
  setActiveChat: (activeChat) => set({ activeChat }),
}));

export default useActiveChatStore;
