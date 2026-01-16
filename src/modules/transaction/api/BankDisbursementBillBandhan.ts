import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillBandhanVo {
  // 自增id
  bill_id: string
  // 核心参考号
  core_ref_number: string
  // 状态
  status: string
  // 执行时间
  execution_time: string
  // 错误代码
  error_code: string
  // 付款日期
  payment_date: string
  // 付款类型
  payment_type: string
  // 客户参考号
  customer_ref_number: string
  // 源账户号码
  source_account_number: string
  // 源账户说明
  source_narration: string
  // 目标账户号码
  destination_account_number: string
  // 币种
  currency: string
  // 金额
  amount: string
  // 目标账户说明
  destination_narration: string
  // 目标银行
  destination_bank: string
  // 目标银行路由代码
  destination_bank_routing_code: string
  // 受益人名称
  beneficiary_name: string
  // 受益人代码
  beneficiary_code: string
  // 受益人账户类型
  beneficiary_account_type: string
  // 创建时间
  created_at: string
  // 创建人ID
  created_by: string
  // 订单号
  order_no: string
  // 上传ID
  upload_id: number
  // 上传源文件hash
  file_hash: string
  // 拒绝原因
  rejection_reason: string
}

// bank_disbursement_bill_bandhan查询
export function page(params: BankDisbursementBillBandhanVo): Promise<ResponseStruct<BankDisbursementBillBandhanVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_bandhan/list', { params })
}

// bank_disbursement_bill_bandhan新增
export function create(data: BankDisbursementBillBandhanVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_bandhan', data)
}

// bank_disbursement_bill_bandhan编辑
export function save(id: number, data: BankDisbursementBillBandhanVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_bandhan/${id}`, data)
}

// bank_disbursement_bill_bandhan删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_bandhan', { data: ids })
}