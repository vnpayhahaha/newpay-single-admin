import type { ResponseStruct } from '#/global'

export interface RecycleBinVo {
  // ID
  id: number
  // 租户编号
  tenant_id: string
  // 回收的数据
  data: string
  // 数据表
  table_name: string
  // 原(1已还原 2未是否已还还原)
  is_restored: string
  // 操作者IP
  ip: string
  // 操作管理员
  operate_by: number
  // 创建时间
  created_at: number
  // 更新时间
  updated_at: number
}

// 回收站查询
export function page(params: RecycleBinVo): Promise<ResponseStruct<RecycleBinVo[]>> {
  return useHttp().get('/admin/recycle_bin/list', { params })
}

// 回收站编辑
export function restore(id: number): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/recycle_bin/${id}/restore`)
}
