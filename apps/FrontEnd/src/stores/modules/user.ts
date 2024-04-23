import { defineStore } from 'pinia'
import { storage } from '@/utils/Storage'

export const useUserStore = defineStore('user', () => {
  const state = {
    token: storage.get('token', ''),
    username: '',
  }
  async function Login(params: any) {
    // const { data ,code} = await loginApi(params)
    console.log(params)
  }
  async function Logout() {
    storage.remove('token')
    state.token = ''
    state.username = ''
    //
  }
  return {
    state,
    Login,
    Logout,
  }
})
