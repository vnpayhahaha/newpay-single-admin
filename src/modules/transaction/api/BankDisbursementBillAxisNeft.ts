import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillAxisNeftVo {
  // 自增id
  bill_id: string
  // 收款人名称
  receipient_name: string
  // 账户号码
  account_number: string
  // IFSC代码
  ifsc_code: string
  // 金额
  amount: string
  // 描述
  description: string
  // 状态
  status: string
  // 失败原因
  failure_reason: string
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
}

// bank_disbursement_bill_axis_neft查询
export function page(params: BankDisbursementBillAxisNeftVo): Promise<ResponseStruct<BankDisbursementBillAxisNeftVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_axis_neft/list', { params })
}

// bank_disbursement_bill_axis_neft新增
export function create(data: BankDisbursementBillAxisNeftVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_axis_neft', data)
}

// bank_disbursement_bill_axis_neft编辑
export function save(id: number, data: BankDisbursementBillAxisNeftVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_axis_neft/${id}`, data)
}

// bank_disbursement_bill_axis_neft删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_axis_neft', { data: ids })
}