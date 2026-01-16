import type { ResponseStruct } from '#/global'

export interface TransactionParsingLogVo {
  // 自增ID
  id: number
  // 原始数据ID
  raw_data_id: number
  // 规则ID
  rule_id: number
  // 规则内容
  rule_text: string
  // 记录匹配变量名称
  variable_name: string
  // 状态：1解析成功 2失败或部分失败
  status: string
  // 凭证ID
  voucher_id: number
  // 创建时间
  created_at: string
  // 失败原因说明
  desc: string
}

// 解析记录查询
export function page(params: TransactionParsingLogVo): Promise<ResponseStruct<TransactionParsingLogVo[]>> {
return useHttp().get('/admin/transaction/transaction_parsing_log/list', { params })
}

// 解析记录新增
export function create(data: TransactionParsingLogVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/transaction_parsing_log', data)
}

// 解析记录编辑
export function save(id: number, data: TransactionParsingLogVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/transaction_parsing_log/${id}`, data)
}

// 解析记录删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/transaction_parsing_log', { data: ids })
}