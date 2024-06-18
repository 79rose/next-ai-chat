import axios from '@/utils/request';

namespace UserApi {
  export async function getUserInfo(userId: number) {
    return axios.get(`/user/${userId}`);
  }
  // 更新用户信息
  export async function updateUserInfo(userId: number, data: any) {
    return axios.put(`/user/${userId}`, data);
  }
}

export default UserApi;
