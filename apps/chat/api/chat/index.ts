import axios from '@/utils/request';

namespace Chat {
  export async function getAllListByUserId(userId: number) {
    return axios.get(`/session?userId=${userId}`);
  }
  // 新建会话
  export async function createSession(userId: number) {
    return axios.post('/session', {
      userId,
    });
  }
  // 更新会话标题
  export async function updateSessionTitle(sessionId: number, title: string) {
    return axios.put(`/session/${sessionId}`, {
      title,
    });
  }
  // 删除会话
  export async function deleteSession(sessionId: number) {
    return axios.delete(`/session/${sessionId}`);
  }

  // 获取会话消息列表
  export async function getMessageListBySessionId(sessionId: number) {
    return axios.get(`/session/${sessionId}/message`);
  }
}

export default Chat;
