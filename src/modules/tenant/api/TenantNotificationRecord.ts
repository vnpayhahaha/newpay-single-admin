import type { ResponseStruct } from '#/global'

export interface TenantNotificationRecordVo {
  // 
  id: number
  // 队列ID
  queue_id: number
  // 租户编号
  tenant_id: string
  // 应用ID
  app_id: number
  // 账户变动类型（继承tenant_account类型1-收款账户 2-付款账户）
  account_type: string
  // 收款订单ID
  collection_order_id: number
  // 付款订单ID
  disbursement_order_id: number
  // 通知类型:1-系统通知 2-订单通知  3-账单通知
  notification_type: string
  // 通知地址
  notification_url: string
  // 请求方式
  request_method: string
  // 请求数据
  request_data: string
  // 响应状态码
  response_status: string
  // 响应数据
  response_data: string
  // 重试次数
  execute_count: number
  // 回调状态:0-失败 1-成功 
  status: string
  // 
  created_at: string
  // 
  updated_at: string
  tenant: {
    tenant_id: string
    company_name: string
  }
  app: {
    id: number
    app_name: string
    app_key: string
  }
  collection_order: {
    id: number
    platform_order_no: string
    tenant_order_no: string
  } | null
  disbursement_order: {
    id: number
    platform_order_no: string
    tenant_order_no: string
  } | null
}

// tenant_notification_record查询
export function page(params: TenantNotificationRecordVo): Promise<ResponseStruct<TenantNotificationRecordVo[]>> {
return useHttp().get('/admin/tenant/tenant_notification_record/list', { params })
}

// tenant_notification_record新增
export function create(data: TenantNotificationRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tenant/tenant_notification_record', data)
}

// tenant_notification_record编辑
export function save(id: number, data: TenantNotificationRecordVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/tenant/tenant_notification_record/${id}`, data)
}

// tenant_notification_record删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/tenant/tenant_notification_record', { data: ids })
}