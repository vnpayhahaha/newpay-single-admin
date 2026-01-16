import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillAxisVo {
  // 主键ID/Primary Key
  bill_id: number
  // 序号/Serial Number
  sr_no: string
  // 企业产品/Corporate Product
  corporate_product: string
  // 支付方式/Payment Method
  payment_method: string
  // 批次号/Batch Number
  batch_no: string
  // 下一工作日日期/Next Working Day Date
  next_working_day_date: string
  // 借记账号/Debit Account Number
  debit_account_no: string
  // 企业账户描述/Corporate Account Description
  corporate_account_description: string
  // 收款人账号/Beneficiary Account Number
  beneficiary_account_no: string
  // 收款人代码/Beneficiary Code
  beneficiary_code: string
  // 收款人姓名/Beneficiary Name
  beneficiary_name: string
  // 付款人姓名/Payee Name
  payee_name: string
  // 币种/Currency
  currency: string
  // 应付金额/Amount Payable
  amount_payable: string
  // 交易状态/Transaction Status
  transaction_status: string
  // CRN编号/CRN Number
  crn_no: string
  // 支付日期/Paid Date
  paid_date: string
  // UTR/RBI参考号/核心参考号/UTR/RBI Reference No./Core Ref No.
  utr_reference_no: string
  // 资金日期/Funding Date
  funding_date: string
  // 原因/Reason
  reason: string
  // 备注/Remarks
  remarks: string
  // 阶段/Stage
  stage: string
  // 邮箱/Email ID
  email_id: string
  // CLG分行名称/CLG Branch Name
  clg_branch_name: string
  // 激活日期/Activation Date
  activation_date: string
  // 支付模式/Payout Mode
  payout_mode: string
  // Finacle支票号/Finacle Cheque No
  finacle_cheque_no: string
  // IFSC代码/MICR代码/IIN/IFSC Code/MICR Code/IIN
  ifsc_code: string
  // 银行参考号/Bank Reference No.
  bank_reference_no: string
  // 账号/Account Number
  account_number: string
  // 创建人ID
  created_by: string
  // 订单号
  order_no: string
  // 上传ID
  upload_id: number
  // 上传源文件hash
  file_hash: string
  // 创建时间/Create Time
  created_at: string
  // 更新时间/Update Time
  updated_at: string
}

// bill_axis查询
export function page(params: BankDisbursementBillAxisVo): Promise<ResponseStruct<BankDisbursementBillAxisVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_axis/list', { params })
}

// bill_axis新增
export function create(data: BankDisbursementBillAxisVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_axis', data)
}

// bill_axis编辑
export function save(id: number, data: BankDisbursementBillAxisVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_axis/${id}`, data)
}

// bill_axis删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_axis', { data: ids })
}