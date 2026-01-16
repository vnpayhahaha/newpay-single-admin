import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillIdfcVo {
  // 自增id
  bill_id: string
  // 收款人姓名/Beneficiary Name
  beneficiary_name: string
  // 收款人账号/Beneficiary Account Number
  beneficiary_account_number: string
  // IFSC代码
  ifsc: string
  // 交易类型/Transaction Type
  transaction_type: string
  // 借记账号/Debit Account No
  debit_account_no: string
  // 交易日期/Transaction Date
  transaction_date: string
  // 金额/Amount
  amount: string
  // 币种/Currency
  currency: string
  // 收款人邮箱/Beneficiary Email ID
  beneficiary_email_id: string
  // 备注/Remarks
  remarks: string
  // UTR编号/UTR Number
  utr_number: string
  // 状态/Status
  status: string
  // 错误信息/Errors
  errors: string
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

// bank_disbursement_bill_idfc查询
export function page(params: BankDisbursementBillIdfcVo): Promise<ResponseStruct<BankDisbursementBillIdfcVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_idfc/list', { params })
}

// bank_disbursement_bill_idfc新增
export function create(data: BankDisbursementBillIdfcVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_idfc', data)
}

// bank_disbursement_bill_idfc编辑
export function save(id: number, data: BankDisbursementBillIdfcVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_idfc/${id}`, data)
}

// bank_disbursement_bill_idfc删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_idfc', { data: ids })
}