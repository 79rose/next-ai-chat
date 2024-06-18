import axios from '@/utils/request';

namespace Auth {
  export async function login(data: { name: string; password: string }) {
    return axios.post('/auth/login', data);
  }
  //  注册账号 默认user
  export async function register(data: { name: string; password: string }) {
    return axios.post('/auth/logup', {
      ...data,
      user_role: 'user',
    });
  }
}
export default Auth;
