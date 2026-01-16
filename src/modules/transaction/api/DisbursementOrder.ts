import type { ResponseStruct } from "#/global";

export interface DisbursementOrderVo {
  //
  id: number;
  // 平台订单号
  platform_order_no: string;
  // 下游订单号
  merchant_order_no: string;
  // 上游订单号
  upstream_order_no: string;
  // 支付时间
  pay_time: string;
  // 订单来源:App-API 管理后台 导入
  order_source: string;
  // 代付渠道D
  disbursement_channel_id: number;
  channel_type: number;
  // 代付银行卡ID
  bank_account_id: number;
  channel_account_id: number;
  // 订单金额
  amount: string;
  // 固定手续费
  fixed_fee: string;
  // 费率手续费
  rate_fee: string;
  // 总手续费
  total_fee: string;
  // 租户入账金额
  settlement_amount: string;
  // 上游手续费
  upstream_fee: string;
  // 上游结算金额
  upstream_settlement_amount: string;
  // 付款类型:1-银行卡 2-UPI
  payment_type: string;
  // 收款人银行名称
  payee_bank_name: string;
  // 收款人银行编码
  payee_bank_code: string;
  // 收款人账户姓名
  payee_account_name: string;
  // 收款人银行卡号
  payee_account_no: string;
  // 收款人UPI账号
  payee_upi: string;
  // 预订交易的凭证/UTR
  pre_utr: string;
  // 实际交易的凭证/UTR
  final_utr: string;
  // 租户编号
  tenant_id: string;
  // 应用ID
  app_id: number;
  // 订单描述
  description: string;
  // 订单状态:
  // 0-创建 10-待支付 11-待回填 20-成功 30-挂起
  // 40-失败 41-已取消 43-已失效 44-已退款
  status: string;
  // 订单失效时间
  expire_time: string;
  // 回调地址
  notify_url: string;
  // 回调次数
  notify_count: number;
  // 通知状态:0-未通知 1-通知成功 2-通知失败 3-回调中
  notify_status: string;
  // 渠道交易号
  channel_transaction_no: string;
  // 错误代码
  error_code: string;
  // 错误信息
  error_message: string;
  // 关联API请求ID
  request_id: string;
  //
  created_at: string;
  //
  updated_at: string;
  transaction_voucher_id: number;
  bank_account: {
    //
    id: number;
    // 银行名称
    branch_name: string;
  } | null;
  channel_account: {
    id: number;
    merchant_id: string;
  } | null;
  channel: {
    channel_code: string;
    channel_icon: string;
    channel_name: string;
    id: number;
  };
  cancel_operator: {
    id: number;
    username: string;
    nickname: string;
  } | null;
  down_bill_template_id: string;
  bank_disbursement_download: {
    id: number;
    file_name: string;
    hash: string;
    suffix: string;
  } | null;
  created_customer: {
    id: number;
    username: string;
  } | null;
  status_records: Array<{
    id: number,
    order_id: number,
    status: number,
    desc_cn: string,
    desc_en: string,
    remark: string
  }>
  platform_transaction_no: string;
  settlement_status: {
    id: number,
    transaction_no: string,
    transaction_status: number,
    transaction_type: number,
    settlement_delay_mode: number,
    settlement_delay_days: number,
    expected_settlement_time: string,
    failed_msg: string,
    remark: string,
  } | null;
}

export interface DisbursementOrderDataVo {
  list: DisbursementOrderVo[];
  total: number;
  order_amount: string;
}

// 付款订单查询
export function page(
  params: DisbursementOrderVo
): Promise<ResponseStruct<DisbursementOrderDataVo>> {
  return useHttp().get("/admin/transaction/disbursement_order/list", {
    params,
  });
}

// 付款订单新增
export function create(
  data: DisbursementOrderVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/disbursement_order", data);
}

// 付款订单编辑
export function save(
  id: number,
  data: DisbursementOrderVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/transaction/disbursement_order/${id}`, data);
}

// 付款订单删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/disbursement_order", {
    data: ids,
  });
}

// 付款订单取消
export function cancel(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/transaction/disbursement_order/cancel", {
    data: ids,
  });
}

// writeOff
export function writeOff(
  id: number,
  data: DisbursementOrderVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/disbursement_order/write_off/${id}`,
    data
  );
}

// distribute
export interface DistributerVo {
  disbursement_channel_id: number;
  channel_type: number;
  channel_account_id?: number;
  bank_account_id?: number;
  ids: number[];
}
export function distribute(data: DistributerVo): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/disbursement_order/distribute`,
    data
  );
}

// 获取下载表单 blod响应 /admin/transaction/disbursement_order/download_bank_bill
export function downloadBankBill(
  ids: number[],
  bill_template_id: string
): Promise<ResponseStruct<Blob>> {
  return useHttp().request({
    url: "/admin/transaction/disbursement_order/download_bank_bill",
    data: {
      ids,
      bill_template_id,
    },
    method: "post",
    timeout: 60 * 1000,
    responseType: "blob",
  });
}

// 付款订单手动回调
export function notify(id: number): Promise<ResponseStruct<null>> {
  return useHttp().get(
    `/admin/transaction/disbursement_order/manual_notify/${id}`
  );
}
