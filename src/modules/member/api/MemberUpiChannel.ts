import type { ResponseStruct } from '#/global'

export interface MemberUpiChannelVo {
  // 主键ID
  id?: number
  // 客户ID
  member_id?: number
  // 渠道ID
  upi_channel_id?: number
  // 渠道编码
  channel_code?: string
  // 渠道配置(JSON)
  config?: string
  // 创建时间
  created_at?: string
  // 更新时间
  updated_at?: string
  // 关联客户信息
  member?: {
    id: number
    username: string
    nickname: string
    phone: string
  }
  // 关联渠道信息
  upi_channel?: {
    id: number
    channel_code: string
    channel_name: string
    channel_icon: string
    status: number
  }
}

// 分页查询
export function page(params: MemberUpiChannelVo): Promise<ResponseStruct<MemberUpiChannelVo[]>> {
  return useHttp().get('/admin/member/member_upi_channel/list', { params })
}

// 查看详情
export function detail(id: number): Promise<ResponseStruct<MemberUpiChannelVo>> {
  return useHttp().get(`/admin/member/member_upi_channel/${id}`)
}

// 查看客户所有渠道
export function listByMember(memberId: number): Promise<ResponseStruct<MemberUpiChannelVo[]>> {
  return useHttp().get(`/admin/member/member_upi_channel/member/${memberId}`)
}

// 新增
export function create(data: MemberUpiChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_upi_channel', data)
}

// 编辑
export function save(id: number, data: MemberUpiChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/member/member_upi_channel/${id}`, data)
}

// 删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/member/member_upi_channel', { data: { ids } })
}

// 彻底删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/member/member_upi_channel/real_delete', { data: { ids } })
}

// 恢复
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put('/admin/member/member_upi_channel/recovery', { ids })
}
