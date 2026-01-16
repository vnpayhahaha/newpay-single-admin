import type { ResponseStruct } from "#/global";

export interface TenantNotificationQueueVo {
  //
  id: number;
  // 租户编号
  tenant_id: string;
  // 应用ID
  app_id: number;
  // 账户变动类型（继承tenant_account类型1-收款账户 2-付款账户）
  account_type: string;
  // 收款订单ID
  collection_order_id: number;
  // 付款订单ID
  disbursement_order_id: number;
  // 通知类型:1-系统通知 2-订单通知 3-账单通知
  notification_type: string;
  // 通知地址
  notification_url: string;
  // 请求方式
  request_method: string;
  // 请求数据
  request_data: string;
  // 执行状态:0-待执行 1-执行中 2-成功 3-失败
  execute_status: string;
  // 执行次数
  execute_count: string;
  // 下次执行时间
  next_execute_time: string;
  // 最后执行时间
  last_execute_time: string;
  // 错误信息
  error_message: string;
  //
  created_at: string;
  //
  updated_at: string;
  // 最大尝试次数
  max_retry_count: number;
  // 乐观锁版本号
  lock_version: string;
}

// tenant_notification_queue查询
export function page(
  params: TenantNotificationQueueVo
): Promise<ResponseStruct<TenantNotificationQueueVo[]>> {
  return useHttp().get("/admin/tenant/tenant_notification_queue/list", {
    params,
  });
}

// tenant_notification_queue新增
export function create(
  data: TenantNotificationQueueVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/tenant/tenant_notification_queue", data);
}

// tenant_notification_queue编辑
export function save(
  id: number,
  data: TenantNotificationQueueVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_notification_queue/${id}`, data);
}

// tenant_notification_queue删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/tenant/tenant_notification_queue", {
    data: ids,
  });
}
