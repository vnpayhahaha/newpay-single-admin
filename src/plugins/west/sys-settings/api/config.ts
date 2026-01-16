import type { ResponseStruct } from '#/global'

interface ConfigSelectData {
  label: string // 显示的标签
  value: string | number // 值，可以是字符串或数字
}

export interface ConfigVo {
  group_id?: number
  key?: string
  value?: string
  name?: string
  input_type?: string
  config_select_data?: Array<ConfigSelectData>
  sort?: number
  remark?: string
}

// System/Config查询
export function page(params: ConfigVo): Promise<ResponseStruct<ConfigVo[]>> {
  return useHttp().get('/admin/setting/config/list', { params })
}

// System/Config新增
export function create(data: ConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/setting/config', data)
}

// System/Config编辑
export function save(id: number, data: ConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/setting/config/${id}`, data)
}

// System/Config删除
export function deleteByKey(key: string): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/setting/config', { data: { key } })
}

// System/Config详情
export function details(id: number): Promise<ResponseStruct<ConfigVo>> {
  return useHttp().get(`/admin/setting/config/details/${id}`)
}

// 批量更新
export function batchUpdate(data: ConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/setting/config/batchUpdate', data)
}
