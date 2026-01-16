import type { ResponseStruct } from '#/global'

export interface ChannelAccountDailyStatsVo {
  //
  id: number
  // 关联channel_account.id
  channel_account_id: number
  // 关联bank_account.id
  bank_account_id: number
  // 渠道ID
  channel_id: number
  // 统计日期(YYYY-MM-DD)
  stat_date: string
  // 当日交易总次数
  transaction_count: string
  // 成功交易次数
  success_count: string
  // 失败交易次数
  failure_count: string
  // 当日已收款金额
  receipt_amount: string
  // 当日已付款金额
  payment_amount: string
  // 交易成功率(%)
  success_rate: string
  // 平均处理时间(s)
  collection_avg_process_time: number
  disbursement_avg_process_time: number
  // 限额状态:0正常 1部分限额 2完全限额
  limit_status: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
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
}

// 渠道账单统计查询
export function page(params: ChannelAccountDailyStatsVo): Promise<ResponseStruct<ChannelAccountDailyStatsVo[]>> {
  return useHttp().get('/admin/channel/channel_account_daily_stats/list', { params })
}

// 渠道账单统计新增
export function create(data: ChannelAccountDailyStatsVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/channel/channel_account_daily_stats', data)
}

// 渠道账单统计编辑
export function save(id: number, data: ChannelAccountDailyStatsVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel_account_daily_stats/${id}`, data)
}

// 渠道账单统计删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/channel/channel_account_daily_stats', { data: ids })
}
