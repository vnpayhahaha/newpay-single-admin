import type { ResponseStruct } from "#/global";

export interface CollectionOrderVo {
  //
  id: number;
  // 平台订单号
  platform_order_no: string;
  // 下游订单号
  tenant_order_no: string;
  // 上游订单号
  upstream_order_no: string;
  // 订单金额
  amount: string;
  // 订单应付金额
  payable_amount: string;
  // 订单实付金额
  paid_amount: string;
  // 固定手续费
  fixed_fee: string;
  // 费率手续费
  rate_fee: string;
  // 总手续费
  total_fee: string;
  // 上游手续费
  upstream_fee: string;
  // 上游结算金额
  upstream_settlement_amount: string;
  // 租户入账金额
  settlement_amount: string;
  // 入账结算类型:0-未入账 1-实付金额 2-订单金额
  settlement_type: string;
  // 收款类型:1-银行卡 2-UPI 3-第三方支付
  collection_type: string;
  // 收款渠道ID
  collection_channel_id: number;
  // 支付时间
  pay_time: string;
  // 订单失效时间
  expire_time: string;
  // 订单来源:APP-API 管理后台 导入
  order_source: string;
  // 核销类型:
  // 0-未核销
  // 1-自动核销
  // 2-人工核销
  // 3-接口核销
  // 4-机器人核销
  recon_type: string;
  // 回调地址
  notify_url: string;
  // 回调次数
  notify_count: number;
  // 通知状态:0-未通知 1-通知成功 2-通知失败 3-回调中
  notify_status: string;
  // 收银台地址
  pay_url: string;
  // 支付成功后跳转地址
  return_url: string;
  // 租户编号
  tenant_id: string;
  // 应用ID
  app_id: number;
  // 付款方名称
  payer_name: string;
  // 付款账号
  payer_account: string;
  // 付款方银行
  payer_bank: string;
  // 付款方IFSC代码
  payer_ifsc: string;
  // 付款方UPI账号
  payer_upi: string;
  // 订单描述
  description: string;
  // 订单状态:
  // 0-创建 10-处理中 20-成功 30-挂起 40-失败
  // 41-已取消 43-已失效 44-已退款
  status: string;
  // 渠道交易号
  channel_transaction_no: string;
  // 错误代码
  error_code: string;
  // 错误信息
  error_message: string;
  // 关联API请求ID
  request_id: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
  // 支付凭证照片
  payment_proof_photo: string;
  // 平台交易流水号
  platform_transaction_no: string;
  // Unique Transaction Reference
  utr: string;
  // 客户提交的UTR
  customer_submitted_utr: string;
  settlement_delay_mode: number;
  settlement_delay_days: number;
  transaction_voucher_id: number;
  cancelled_at: string;
  cancelled_by: number;
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
  cancel_customer: {
    id: number;
    username: string;
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
    remark: string,
    created_at?: string
  }>
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

export interface CollectionOrderVoDataVo {
  list: CollectionOrderVo[];
  total: number;
  order_amount: string;
  payable_amount: string;
  paid_amount: string;
}
// 收款订单查询
export function page(
  params: CollectionOrderVo
): Promise<ResponseStruct<CollectionOrderVoDataVo>> {
  return useHttp().get("/admin/transaction/collection_order/list", { params });
}

// 收款订单新增
export function create(data: CollectionOrderVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/collection_order", data);
}

// 收款订单编辑
export function save(
  id: number,
  data: CollectionOrderVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/transaction/collection_order/${id}`, data);
}

// 收款订单取消
export function cancel(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/transaction/collection_order/cancel", {
    data: ids,
  });
}

// writeOff
export function writeOff(
  id: number,
  data: CollectionOrderVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/collection_order/write_off/${id}`,
    data
  );
}

// 收款订单手动回调
export function notify(id: number): Promise<ResponseStruct<null>> {
  return useHttp().get(
    `/admin/transaction/collection_order/manual_notify/${id}`
  );
}
