// 记录当前聊天会话的状态

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatStore {
  isChat: boolean;
  setIsChat: (isChat: boolean) => void;
  currentSessionId: string;
  currentSessionList: any[];
  setCurrentSessionId: (sessionId: string) => void;
  setCurrentSessionList: (sessionList: any[]) => void;
  currentChatList: any[];
  setCurrentChatList: (chatList: any[]) => void;
}

const useChatStore = create(
  persist<ChatStore>(
    (set) => ({
      currentSessionId: '',
      currentSessionList: [],
      isChat: false,
      setIsChat: (isChat: boolean) => set({ isChat }),
      setCurrentSessionId: (sessionId: string) =>
        set({ currentSessionId: sessionId }),
      setCurrentSessionList: (sessionList: any[]) =>
        set({ currentSessionList: sessionList }),
      currentChatList: [],
      setCurrentChatList: (chatList: any[]) =>
        set({ currentChatList: chatList }),
    }),
    {
      name: 'chat-store',
      getStorage: () => localStorage,
    }
  )
);

export default useChatStore;
