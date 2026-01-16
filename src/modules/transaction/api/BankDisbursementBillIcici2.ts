import type { ResponseStruct } from "#/global";

export interface BankDisbursementBillIcici2Vo {
  // 自增id
  bill_id: string;
  // 网络ID
  network_id: string;
  // 贷方账户号码
  credit_account_number: string;
  // 借方账户号码
  debit_account_number: string;
  // IFSC代码
  ifsc_code: string;
  // 总金额
  total_amount: string;
  // 主机参考号码
  host_reference_number: string;
  // 交易备注
  transaction_remarks: string;
  // 交易状态
  transaction_status: string;
  // 交易状态备注
  transaction_status_remarks: string;
  // 创建时间
  created_at: string;
  // 创建人ID
  created_by: string;
  // 订单号
  order_no: string;
  // 上传ID
  upload_id: number;
  // 上传源文件hash
  file_hash: string;
  // 拒绝原因
  rejection_reason: string;
}

// bank_disbursement_bill_icici_2查询
export function page(
  params: BankDisbursementBillIcici2Vo
): Promise<ResponseStruct<BankDisbursementBillIcici2Vo[]>> {
  return useHttp().get(
    "/admin/transaction/bank_disbursement_bill_icici_2/list",
    { params }
  );
}

// bank_disbursement_bill_icici_2新增
export function create(
  data: BankDisbursementBillIcici2Vo
): Promise<ResponseStruct<null>> {
  return useHttp().post(
    "/admin/transaction/bank_disbursement_bill_icici2",
    data
  );
}

// bank_disbursement_bill_icici_2编辑
export function save(
  id: number,
  data: BankDisbursementBillIcici2Vo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/bank_disbursement_bill_icici2/${id}`,
    data
  );
}

// bank_disbursement_bill_icici_2删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/bank_disbursement_bill_icici2", {
    data: ids,
  });
}
