import type { ResponseStruct } from '#/global'

export interface MemberAccountVo {
  // ID
  id: number
  // 客户ID
  member_id: number
  // 可用余额
  balance_available: string
  // 冻结金额
  balance_frozen: string
  // 乐观锁版本
  version: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

// member_account查询
export function page(params: MemberAccountVo): Promise<ResponseStruct<MemberAccountVo[]>> {
return useHttp().get('/admin/member/member_account/list', { params })
}

// member_account新增
export function create(data: MemberAccountVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_account', data)
}

// member_account编辑
export function save(id: number, data: MemberAccountVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member_account/${id}`, data)
}

// member_account删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member_account', { data: ids })
}