import type { ResponseStruct } from '#/global'

export interface MemberLoginLogVo {
  // 主键
  id: number
  // 客户ID
  member_id: number
  // 用户名
  username: string
  // 登录IP地址
  ip: string
  // 操作系统
  os: string
  // 浏览器
  browser: string
  // 登录状态 (1成功 0失败)
  status: string
  // 提示消息
  message: string
  // 登录时间
  login_time: string
  // 备注
  remark: string
}

// member_login_log查询
export function page(params: MemberLoginLogVo): Promise<ResponseStruct<MemberLoginLogVo[]>> {
return useHttp().get('/admin/member/member_login_log/list', { params })
}

// member_login_log新增
export function create(data: MemberLoginLogVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_login_log', data)
}

// member_login_log编辑
export function save(id: number, data: MemberLoginLogVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member_login_log/${id}`, data)
}

// member_login_log删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member_login_log', { data: ids })
}