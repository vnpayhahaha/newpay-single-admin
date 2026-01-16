import type { ResponseStruct } from "#/global";

interface ChannelAccountAPIConfigVo {
  value: string;
  label: string;
}
export interface ChannelAccountVo {
  // id
  id: number;
  // 渠道ID
  channel_id: number;
  // 渠道商户ID
  merchant_id: string;
  // API配置
  api_config: Array<ChannelAccountAPIConfigVo>;
  // 文档信息
  document_info: string;
  // 接口版本
  api_version: string;
  // 回调地址
  callback_url: string;
  // 回调请求IP白名单
  ip_whitelist: string;
  // 渠道账户余额
  balance: number;
  // 币种
  currency: string;
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
  // 状态:1-启用 0-停用
  status: boolean;
  //
  created_at: string;
  //
  updated_at: string;
  deleted_at: string;
  support_collection: boolean;
  support_disbursement: boolean;
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
  channel: {
    channel_code: string;
    channel_icon: string;
    channel_name: string;
    id: number;
  };
}

// 渠道账户查询
export function page(
  params: ChannelAccountVo
): Promise<ResponseStruct<ChannelAccountVo[]>> {
  return useHttp().get("/admin/channel/channel_account/list", { params });
}

// 渠道账户新增
export function create(data: ChannelAccountVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/channel/channel_account", data);
}

// 渠道账户编辑
export function save(
  id: number,
  data: ChannelAccountVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel_account/${id}`, data);
}

// 渠道账户删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel_account", { data: ids });
}

// channel真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel_account/real_delete", {
    data: ids,
  });
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/channel/channel_account/recovery", { ids });
}
export interface ChannelAccountDictVo {
  // 'id',
  // 'channel_id',
  // 'merchant_id',
  // 'currency',
  // 'status',
  // 'support_collection',
  // 'support_disbursement',
  id: string;
  channel_id: number;
  merchant_id: string;
  currency: string;
  status: boolean;
  support_collection: boolean;
  support_disbursement: boolean;
}

export interface AvailableOption {
  id: number;
  merchant_id: string;
}

export function remote(params?: {
  channel_id?: number;
  support_collection?: number;
  status?: number;
  support_disbursement?: number;
}): Promise<ResponseStruct<ChannelAccountDictVo[]>> {
  return useHttp().get("/admin/channel/channel_account/remote", { params });
}

export function availableOptions(
  type: number
): Promise<ResponseStruct<AvailableOption[]>> {
  return useHttp().get(
    `/admin/channel/channel_account/available_options/${type}`
  );
}
