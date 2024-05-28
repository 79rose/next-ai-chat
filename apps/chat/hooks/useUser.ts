import { create } from 'zustand';

interface UserStore {
  userName: string;
  userImg: string;
  isLogin: boolean;
  login: (userName: string, userImg: string) => void;
  logout: () => void;
  token: string;
  setToken: (token: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userName: '',
  userImg: '',
  isLogin: false,
  token: '',
  login: (userName: string, userImg: string) =>
    set({ userName, userImg, isLogin: true }),
  logout: () => set({ userName: '', userImg: '', isLogin: false }),
  setToken: (token: string) => set({ token }),
}));

export default useUserStore;
