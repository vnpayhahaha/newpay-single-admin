import type { ResponseStruct } from "#/global";

// 设备指令队列
export interface DeviceCommandVo {
  id: number;
  command_no: string;
  device_id: number | null;
  command_type: number;
  business_type: number | null;
  order_id: number | null;
  order_no: string | null;
  command_data: Record<string, any>;
  priority: number;
  status: number;
  retry_count: number;
  max_retry: number;
  timeout_seconds: number;
  scheduled_at: string | null;
  sent_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  expire_at: string | null;
  error_code: string | null;
  error_message: string | null;
  lock_version: number;
  created_at: string;
  updated_at: string;
}

// 设备指令结果
export interface DeviceCommandResultVo {
  id: number;
  result_no: string;
  command_id: number;
  command_no: string;
  device_id: number | null;
  result_type: number;
  result_code: string | null;
  result_message: string | null;
  result_data: Record<string, any> | null;
  utr: string | null;
  paid_amount: number | null;
  screenshot_url: string | null;
  raw_data: string | null;
  execution_time: number | null;
  process_status: number;
  process_result: string | null;
  processed_at: string | null;
  lock_version: number;
  created_at: string;
  updated_at: string;
}

// 指令详情响应
export interface DeviceCommandDetailVo {
  command: DeviceCommandVo;
  results: DeviceCommandResultVo[];
}

// 指令队列查询
export function page(
  params: Partial<DeviceCommandVo>
): Promise<ResponseStruct<DeviceCommandVo[]>> {
  return useHttp().get("/admin/device/command/list", { params });
}

// 指令详情
export function detail(id: number): Promise<ResponseStruct<DeviceCommandDetailVo>> {
  return useHttp().get(`/admin/device/command/detail/${id}`);
}

// 重试指令
export function retry(id: number): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/device/command/retry/${id}`);
}

// 取消指令
export function cancel(id: number, reason?: string): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/device/command/cancel/${id}`, { reason });
}

// 执行结果列表
export function resultPage(
  params: Partial<DeviceCommandResultVo>
): Promise<ResponseStruct<DeviceCommandResultVo[]>> {
  return useHttp().get("/admin/device/result/list", { params });
}

// 获取指令类型选项
export function getCommandTypeOptions(): Promise<ResponseStruct<Common.StatusOptionItem[]>> {
  return useHttp().get("/admin/device/command/type_options");
}

// 获取业务类型选项
export function getBusinessTypeOptions(): Promise<ResponseStruct<Common.StatusOptionItem[]>> {
  return useHttp().get("/admin/device/command/business_type_options");
}

// 获取指令状态选项
export function getStatusOptions(): Promise<ResponseStruct<Common.StatusOptionItem[]>> {
  return useHttp().get("/admin/device/command/status_options");
}
