import type { ResponseStruct } from '#/global'

export interface TenantAppVo {
  // 主键
  id: number
  // 租户编号
  tenant_id: string
  // 应用名称
  app_name: string
  // 应用ID
  app_key: string
  // 应用密钥
  app_secret: string
  // 状态 (1正常 2停用)
  status: boolean
  // 应用介绍
  description: string
  // 创建者
  created_by: number
  // 创建时间
  created_at: string
  // 更新者
  updated_by: number
  // 更新时间
  updated_at: string
  // 删除者
  deleted_by: number
  // 删除时间
  deleted_at: string
  // 备注
  remark: string
}

// 租户应用查询
export function page(params: TenantAppVo): Promise<ResponseStruct<TenantAppVo[]>> {
  return useHttp().get('/admin/tenant/tenant_app/list', { params })
}

// 租户应用新增
export function create(data: TenantAppVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tenant/tenant_app', data)
}

// 租户应用编辑
export function save(id: number, data: TenantAppVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_app/${id}`, data)
}

// 租户应用删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tenant/tenant_app', { data: ids })
}
// 租户管理真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tenant/tenant_app/real_delete', { data: ids })
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put('/admin/tenant/tenant_app/recovery', { ids })
}

export function selectStatus(): Promise<ResponseStruct<Common.StatusOption[]>> {
  return useHttp().get('/public/selectOption?table_name=tenant_app&field_list=status_list')
}

export function getAppKey(): Promise<ResponseStruct<{ app_key: string }>> {
  return useHttp().get('/admin/tenant/tenant_app/get_app_key')
}

export function getAppSecret(): Promise<ResponseStruct<{ app_secret: string }>> {
  return useHttp().get('/admin/tenant/tenant_app/get_app_secret')
}
