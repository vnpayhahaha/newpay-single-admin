import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillAxisNeoVo {
  // 自增id
  bill_id: number
  // 序列号
  srl_no: string
  // 交易日期
  tran_date: string
  // 支票号
  chq_no: string
  // 摘要
  particulars: string
  // 金额(INR)
  amount_inr: string
  // 借/贷
  dr_cr: string
  // 余额(INR)
  balance_inr: string
  // SOL
  sol: string
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

// bank_disbursement_bill_axis_neo查询
export function page(params: BankDisbursementBillAxisNeoVo): Promise<ResponseStruct<BankDisbursementBillAxisNeoVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_axis_neo/list', { params })
}

// bank_disbursement_bill_axis_neo新增
export function create(data: BankDisbursementBillAxisNeoVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_axis_neo', data)
}

// bank_disbursement_bill_axis_neo编辑
export function save(id: number, data: BankDisbursementBillAxisNeoVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_axis_neo/${id}`, data)
}

// bank_disbursement_bill_axis_neo删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_axis_neo', { data: ids })
}