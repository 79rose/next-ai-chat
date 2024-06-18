import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  userName: string;
  userImg: string;
  isLogin: boolean;
  userId: number;
  login: (userId: number, userName: string, userImg: string) => void;
  logout: () => void;
  token: string;
  setToken: (token: string) => void;
  setUser: (userName: string, userImg: string) => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userName: '',
      userImg: '',
      isLogin: false,
      token: '',
      userId: 0,
      setUser: (userName, userImg) => set({ userName, userImg }),
      login: (userId: number, userName: string, userImg: string) =>
        set({ userId, userName, userImg, isLogin: true }),
      logout: () => {
        set({ userName: '', userImg: '', isLogin: false });
      },
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'user-store',
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
