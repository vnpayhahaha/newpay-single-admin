import type { ResponseStruct } from "#/global";

export interface BankDisbursementBillIciciVo {
  // 自增id
  bill_id: string;
  // 支付模式(IMPS)
  pymt_mode: string;
  // 文件序列号
  file_sequence_num: string;
  // 借记账户号码
  debit_acct_no: string;
  // 受益人名称
  beneficiary_name: string;
  // 受益人账户号
  beneficiary_account_no: string;
  // 受益人IFSC代码
  bene_ifsc_code: string;
  // 金额
  amount: string;
  // 备注
  remark: string;
  // 支付日期
  pymt_date: string;
  // 状态
  status: string;
  // 拒绝原因
  rejection_reason: string;
  // 客户编号
  customer_ref_no: string;
  // UTR_NO
  utr_no: string;
  // 订单号
  order_no: string;
  // 上传ID
  upload_id: number;
  // 上传源文件hash
  file_hash: string;
  // 创建时间
  created_at: string;
  // 创建人ID
  created_by: string;
}

// bank_disbursement_bill_icici查询
export function page(
  params: BankDisbursementBillIciciVo
): Promise<ResponseStruct<BankDisbursementBillIciciVo[]>> {
  return useHttp().get("/admin/transaction/bank_disbursement_bill_icici/list", {
    params,
  });
}

// bank_disbursement_bill_icici新增
export function create(
  data: BankDisbursementBillIciciVo
): Promise<ResponseStruct<null>> {
  return useHttp().post(
    "/admin/transaction/bank_disbursement_bill_icici",
    data
  );
}

// bank_disbursement_bill_icici编辑
export function save(
  id: number,
  data: BankDisbursementBillIciciVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/bank_disbursement_bill_icici/${id}`,
    data
  );
}

// bank_disbursement_bill_icici删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/bank_disbursement_bill_icici", {
    data: ids,
  });
}
