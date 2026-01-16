import type { ResponseStruct } from '#/global'

export interface MemberTronTransactionRecordVo {
  // 记录ID
  id: string
  // 交易hash
  transaction_id: string
  // 代币符号
  symbol: string
  // 代币合约地址
  token_address: string
  // 代币精度
  decimals: string
  // 代币名称
  token_name: string
  // 交易时间戳
  block_timestamp: number
  // 转出地址
  from_address: string
  // 转入地址
  to_address: string
  // 交易类型
  transaction_type: string
  // 交易金额
  amount: string
  // 客户ID
  member_id: number
  // 申请ID
  tron_apply_id: number
  // 状态(1待核销 2已核销 3已取消 4已超时)
  status: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

// member_tron_transaction_record查询
export function page(params: MemberTronTransactionRecordVo): Promise<ResponseStruct<MemberTronTransactionRecordVo[]>> {
return useHttp().get('/admin/member/member_tron_transaction_record/list', { params })
}

// member_tron_transaction_record新增
export function create(data: MemberTronTransactionRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_tron_transaction_record', data)
}

// member_tron_transaction_record编辑
export function save(id: number, data: MemberTronTransactionRecordVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member_tron_transaction_record/${id}`, data)
}

// member_tron_transaction_record删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member_tron_transaction_record', { data: ids })
}