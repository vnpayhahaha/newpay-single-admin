import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillIobOtherVo {
  // 自增id
  bill_id: string
  // 序号
  s_no: string
  // 姓名
  name: string
  // IFSC代码
  ifsc_code: string
  // 类型
  type: string
  // 编号
  number: string
  // 金额
  amount: string
  // 费用
  charges: string
  // 状态
  status: string
  // 备注
  remarks: string
  // 说明
  narration: string
  // UTR编号
  utr_no: string
  // 原因
  reason: string
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

// bank_disbursement_bill_iob_other查询
export function page(params: BankDisbursementBillIobOtherVo): Promise<ResponseStruct<BankDisbursementBillIobOtherVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_iob_other/list', { params })
}

// bank_disbursement_bill_iob_other新增
export function create(data: BankDisbursementBillIobOtherVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_iob_other', data)
}

// bank_disbursement_bill_iob_other编辑
export function save(id: number, data: BankDisbursementBillIobOtherVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_iob_other/${id}`, data)
}

// bank_disbursement_bill_iob_other删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_iob_other', { data: ids })
}