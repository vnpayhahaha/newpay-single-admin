import type { ResponseStruct } from '#/global'

export interface MemberTronApplyVo {
  // 主键ID
  id: string
  // 记录recordID
  record_id: number
  // 收款地址
  tron_address: string
  // 金额
  amount: string
  // 确认金额
  confirm_amount: string
  // 确认时间
  confirm_time: string
  // 备注
  remark: string
  // 充值状态(1待确认 2已确认 3已取消 4已失效)
  status: string
  // 类型(11充值 12提现)
  type: string
  // 客户ID
  member_id: number
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

// member_tron_apply查询
export function page(params: MemberTronApplyVo): Promise<ResponseStruct<MemberTronApplyVo[]>> {
return useHttp().get('/admin/member/member_tron_apply/list', { params })
}

// member_tron_apply新增
export function create(data: MemberTronApplyVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_tron_apply', data)
}

// member_tron_apply编辑
export function save(id: number, data: MemberTronApplyVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member_tron_apply/${id}`, data)
}

// member_tron_apply删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member_tron_apply', { data: ids })
}