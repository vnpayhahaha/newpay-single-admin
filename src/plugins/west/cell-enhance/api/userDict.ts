import type { ResponseStruct } from '#/global'

export interface UserDictVo {
  id: string
  username: string
  user_type: number
  nickname: string
  status: number
  login_ip: string
  login_time: string
}

export function remote(): Promise<ResponseStruct<UserDictVo[]>> {
  return useHttp().get('/admin/userDict/remote')
}
