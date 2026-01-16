import type { ResponseStruct } from '#/global'

export interface MemberAccountRecordVo {
  // 主键ID
  id: number
  // 客户ID
  member_id: number
  // 关联客户账户ID
  member_account_id: number
  // 变更金额（正：增加，负：减少）
  change_amount: string
  // 变更前余额
  balance_available_before: string
  // 变更后余额
  balance_available_after: string
  // 变更前冻结金额
  balance_frozen_before: string
  // 变更后冻结金额
  balance_frozen_after: string
  // 类型(11充值 12提现 21代付 22代收 30直接奖励 31上级奖励 32间接奖励 41管理员添加 42管理员减扣 50其他手续费)
  type: string
  // 关联交易流水号
  transaction_no: string
  // 记录创建时间
  created_at: string
}

// member_account_record查询
export function page(params: MemberAccountRecordVo): Promise<ResponseStruct<MemberAccountRecordVo[]>> {
return useHttp().get('/admin/member/member_account_record/list', { params })
}

// member_account_record新增
export function create(data: MemberAccountRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_account_record', data)
}

// member_account_record编辑
export function save(id: number, data: MemberAccountRecordVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member_account_record/${id}`, data)
}

// member_account_record删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member_account_record', { data: ids })
}