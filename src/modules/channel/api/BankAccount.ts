import type { ResponseStruct } from "#/global";

interface AccountConfigVo {
  value: string;
  label: string;
}
export interface BankAccountVo {
  //
  id: number;
  // 银行id
  channel_id: number;
  // 支行名称
  branch_name: string;
  // 账户持有人
  account_holder: string;
  // 账号
  account_number: string;
  // IFSC代码
  bank_code: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
  // 账户余额
  balance: number;
  // 代收小数浮动开关:0关闭 1启用
  float_amount_enabled: boolean;
  // 单日最大收款限额
  daily_max_receipt: number;
  // 单日最大付款限额
  daily_max_payment: number;
  // 单日最大收款次数
  daily_max_receipt_count: number;
  // 单日最大付款次数
  daily_max_payment_count: number;
  // 单笔最大收款限额
  max_receipt_per_txn: number;
  // 单笔最大付款限额
  max_payment_per_txn: number;
  // 单笔最小收款限额
  min_receipt_per_txn: number;
  // 单笔最小付款限额
  min_payment_per_txn: number;
  // 安全等级(1-99)
  security_level: number;
  // 最后使用时间
  last_used_time: string;
  // UPI支付地址
  upi_id: string;
  // 实际已用金额额度
  used_quota: number;
  // 限制使用金额额度
  limit_quota: number;
  // 当日已收款次数
  today_receipt_count: number;
  // 当日已付款次数
  today_payment_count: number;
  // 当日已收款金额
  today_receipt_amount: number;
  // 当日已付款金额
  today_payment_amount: number;
  // 统计日期(YYYY-MM-DD)
  stat_date: string;
  // 状态(1启用 2停用)
  status: boolean;
  deleted_at: string;
  support_collection: boolean;
  support_disbursement: boolean;
  down_bill_template_id: string[];
  // API配置
  account_config: Array<AccountConfigVo>;
}

// 银行账户查询
export function page(
  params: BankAccountVo
): Promise<ResponseStruct<BankAccountVo[]>> {
  return useHttp().get("/admin/channel/bank_account/list", { params });
}

// down_bill_template_ids
export function down_bill_template_ids(
  id: number
): Promise<ResponseStruct<string[]>> {
  return useHttp().get(`/admin/channel/down_bill_template_ids/${id}`);
}

// 银行账户新增
export function create(data: BankAccountVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/channel/bank_account", data);
}

// 银行账户编辑
export function save(
  id: number,
  data: BankAccountVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/bank_account/${id}`, data);
}

// 银行账户删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/bank_account", { data: ids });
}
// 真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/bank_account/real_delete", {
    data: ids,
  });
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/channel/bank_account/recovery", { ids });
}
export interface BankAccountDictVo {
  id: string;
  channel_id: number;
  branch_name: string;
  bank_code: string;
  account_holder: string;
  account_number: string;
  status: boolean;
  support_collection: boolean;
  support_disbursement: boolean;
}

export function remote(params?: {
  channel_id?: number;
  support_collection?: number;
  status?: number;
  support_disbursement?: number;
}): Promise<ResponseStruct<BankAccountDictVo[]>> {
  return useHttp().get("/admin/channel/bank_account/remote", { params });
}
