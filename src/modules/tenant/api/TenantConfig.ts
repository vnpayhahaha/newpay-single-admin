import type { ResponseStruct } from '#/global'

export interface TenantConfigVo {
  // 配置ID
  id: number
  // 租户编号
  tenant_id: string
  // 分组编码
  group_code: string
  // 唯一编码
  code: string
  // 配置名称
  name: string
  // 配置内容
  content: string
  // 是否启用
  enabled: boolean
  // 介绍说明
  intro: string
  // 备用选项
  option: string
  // 创建者
  created_by: number
  // 更新者
  updated_by: number
  // 删除者
  deleted_by: number
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
  // 删除时间
  deleted_at: string
}

// 租户配置查询
export function page(params: TenantConfigVo): Promise<ResponseStruct<TenantConfigVo[]>> {
  return useHttp().get('/admin/tenant/tenant_config/list', { params })
}

// 租户配置新增
export function create(data: TenantConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tenant/tenant_config', data)
}

// 租户配置编辑
export function save(id: number, data: TenantConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_config/${id}`, data)
}

// 租户配置删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tenant/tenant_config', { data: ids })
}
