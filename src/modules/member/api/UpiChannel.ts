import type { ResponseStruct } from '#/global'

export interface UpiChannelVo {
  // 主键ID
  id?: number
  // 渠道编码
  channel_code?: string
  // 渠道名称
  channel_name?: string
  // 渠道图标
  channel_icon?: string
  // 国家代码
  country_code?: string
  // 状态:1-启用 0-停用
  status?: number
  // 创建时间
  created_at?: string
  // 更新时间
  updated_at?: string
}

// 分页查询
export function page(params: UpiChannelVo): Promise<ResponseStruct<UpiChannelVo[]>> {
  return useHttp().get('/admin/upi_channel/list', { params })
}

// 查看详情
export function detail(id: number): Promise<ResponseStruct<UpiChannelVo>> {
  return useHttp().get(`/admin/upi_channel/${id}`)
}

// 新增
export function create(data: UpiChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/upi_channel', data)
}

// 编辑
export function save(id: number, data: UpiChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/upi_channel/${id}`, data)
}

// 修改状态
export function changeStatus(id: number, status: number): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/upi_channel/change_status/${id}`, { status })
}

// 删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/upi_channel', { data: { ids } })
}

// 彻底删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/upi_channel/real_delete', { data: { ids } })
}

// 恢复
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put('/admin/upi_channel/recovery', { ids })
}

// 远程选择（供其他模块引用）
export function remote(): Promise<ResponseStruct<UpiChannelVo[]>> {
  return useHttp().get('/admin/upi_channel/list', { params: { status: 1, page_size: 999 } })
}
