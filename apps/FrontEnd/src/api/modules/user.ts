import http from '@/utils/http'
import type { response } from '@/api/types/base'
import { UserEnum } from '@/enums/api/user'

export function useApiTest({ params }: any) {
  return http.post<any, response<User.basic>>(UserEnum.USER_TEST, { params })
}
