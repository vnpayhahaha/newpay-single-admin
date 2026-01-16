import type { ResponseStruct } from '#/global'

export interface BankDisbursementBillYesmsmeVo {
  // 自增id
  bill_id: string
  // 记录
  record: string
  // 记录参考号
  record_ref_no: string
  // 文件参考号
  file_ref_no: string
  // 电子银行参考号
  ebanking_ref_no: string
  // 合同参考号
  contract_ref_no: string
  // 记录状态
  record_status: string
  // 状态代码
  status_code: string
  // 状态描述
  status_description: string
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

// bank_disbursement_bill_yesmsme查询
export function page(params: BankDisbursementBillYesmsmeVo): Promise<ResponseStruct<BankDisbursementBillYesmsmeVo[]>> {
return useHttp().get('/admin/transaction/bank_disbursement_bill_yesmsme/list', { params })
}

// bank_disbursement_bill_yesmsme新增
export function create(data: BankDisbursementBillYesmsmeVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/bank_disbursement_bill_yesmsme', data)
}

// bank_disbursement_bill_yesmsme编辑
export function save(id: number, data: BankDisbursementBillYesmsmeVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/transaction/bank_disbursement_bill_yesmsme/${id}`, data)
}

// bank_disbursement_bill_yesmsme删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/transaction/bank_disbursement_bill_yesmsme', { data: ids })
}