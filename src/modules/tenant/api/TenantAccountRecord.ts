import type { ResponseStruct } from '#/global'

export interface TenantAccountRecordVo {
  // 主键ID
  id: number
  // 租户编号
  tenant_id: string
  // 关联租户账户ID
  tenant_account_id: number
  // 账户类型:1-收款账户 2-付款账户
  account_id: string
  account_type: string
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
  // 变更类型：1-交易 2-人工调整 3-冲正 4-冻结/解冻 6-转入/转出
  change_type: string
  // 关联交易流水号
  transaction_no: string
  // 记录创建时间
  created_at: string
}

// 账单记录查询
export function page(params: TenantAccountRecordVo): Promise<ResponseStruct<TenantAccountRecordVo[]>> {
  return useHttp().get('/admin/tenant/tenant_account_record/list', { params })
}

// 账单记录新增
export function create(data: TenantAccountRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tenant/tenant_account_record', data)
}

// 账单记录编辑
export function save(id: number, data: TenantAccountRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_account_record/${id}`, data)
}

// 账单记录删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tenant/tenant_account_record', { data: ids })
}
