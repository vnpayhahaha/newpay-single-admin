import type { ResponseStruct } from '#/global'

export interface MemberUpiAccountVo {
  // 主键ID
  id?: number
  // 客户ID
  member_id?: number
  // UPI地址
  upi_id?: string
  // UPI持有人姓名
  upi_name?: string
  // 关联手机号
  phone?: string
  // 状态:1-启用 0-停用
  status?: number
  // 是否默认账号:1-是 0-否
  is_default?: number
  // 支持收款:1-是 0-否
  support_collection?: number
  // 支持付款:1-是 0-否
  support_disbursement?: number
  // 单日最大收款限额
  daily_max_receipt_amount?: string
  // 单日最大付款限额
  daily_max_payment_amount?: string
  // 单日最大收款次数
  daily_max_receipt_count?: number
  // 单日最大付款次数
  daily_max_payment_count?: number
  // 当日已收款金额
  today_receipt_amount?: string
  // 当日已付款金额
  today_payment_amount?: string
  // 当日已收款次数
  today_receipt_count?: number
  // 当日已付款次数
  today_payment_count?: number
  // 最近一次收款时间
  last_receipt_at?: string
  // 最近一次付款时间
  last_payment_at?: string
  // 统计日期
  stat_date?: string
  // 备注
  remark?: string
  // 创建者
  created_by?: number
  // 更新者
  updated_by?: number
  // 创建时间
  created_at?: string
  // 更新时间
  updated_at?: string
  // 关联客户信息
  member?: {
    id: number
    username: string
    nickname: string
    phone: string
  }
}

// 分页查询
export function page(params: MemberUpiAccountVo): Promise<ResponseStruct<MemberUpiAccountVo[]>> {
  return useHttp().get('/admin/member/member_upi_account/list', { params })
}

// 查看详情
export function detail(id: number): Promise<ResponseStruct<MemberUpiAccountVo>> {
  return useHttp().get(`/admin/member/member_upi_account/${id}`)
}

// 查看客户所有UPI账号
export function listByMember(memberId: number): Promise<ResponseStruct<MemberUpiAccountVo[]>> {
  return useHttp().get(`/admin/member/member_upi_account/member/${memberId}`)
}

// 新增
export function create(data: MemberUpiAccountVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_upi_account', data)
}

// 编辑
export function save(id: number, data: MemberUpiAccountVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/member/member_upi_account/${id}`, data)
}

// 修改状态
export function changeStatus(id: number, status: number): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/member/member_upi_account/change_status/${id}`, { status })
}

// 删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/member/member_upi_account', { data: { ids } })
}

// 彻底删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/member/member_upi_account/real_delete', { data: { ids } })
}

// 恢复
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put('/admin/member/member_upi_account/recovery', { ids })
}
