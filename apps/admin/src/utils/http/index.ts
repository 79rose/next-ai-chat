import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { useUserStore } from '@/stores/modules/user'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL as string,
  timeout: 10 * 1000,
})
instance.defaults.headers.post['Content-Type'] = 'application/json'
// 请求队列
const RequestList = new Set<string>()
// 响应队列
const ResponseMap = new Map<string, any>()

// 生成唯一标识
function generateKey(config: AxiosRequestConfig): string {
  return `${config.url}&${config.method}`
}

// 响应成功处理函数
async function successHandler(response: AxiosResponse) {
  // 请求队列中移除当前请求
  const key = generateKey(response.config)
  RequestList.delete(key)
  // 响应队列中添加当前响应
  ResponseMap.set(key, response)
  switch (response.status) {
    case 200:
      // 成功返回的处理逻辑
      return await Promise.resolve(response)
    case 201:
      // 成功创建的处理逻辑
      return await Promise.resolve(response)
    case 204:
      // 成功删除的处理逻辑
      return await Promise.resolve(response)
    default:
      return await Promise.reject(response)
  }
}

// 响应错误处理函数
async function errorHandler(response: AxiosResponse) {
  // 请求队列中移除当前请求
  const key = generateKey(response.config)
  RequestList.delete(key)
  //   const userStore = useUserStore()
  switch (response.status) {
    case 400:
      console.log(response.status)
      return await Promise.reject(response)
    case 401:
      console.log(response.status)
      //   userStore.logout()
      return await Promise.reject(response)
    case 404:
      console.log(response.status)

      return await Promise.reject(response)
    default:
      throw new Error('系统未知错误，请反馈给管理员')
  }
}

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const key = generateKey(config)
    // 请求队列中是否有当前请求 有则返回最新请求
    if (RequestList.has(key))
      return Promise.resolve(ResponseMap.get(key))
    // 重复请求时，忽略后面的请求
    if (RequestList.has(key))
      return Promise.reject(new Error('重复请求'))
    // 请求队列中添加当前请求
    RequestList.add(key)
    const userStore = useUserStore()
    const token = userStore.state.token
    if (token && config && config.headers && config.headers.Authorization)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
)

instance.interceptors.response.use(
  async (response) => {
    return await successHandler(response)
  },
  async (error) => {
    return await errorHandler(error)
  },
)
export default instance
