import type { ResponseStruct } from '#/global'

export interface MemberVo {
  // 用户ID,主键
  id: number
  // 用户名
  username: string
  // 密码
  password: string
  // PIN码
  pin: string
  // 用户昵称
  nickname: string
  // 手机
  phone: string
  // 用户邮箱
  email: string
  // 用户头像
  avatar: string
  // 个人签名
  signed: string
  // 状态:1=正常,0=停用
  status: string
  // 在线状态(1在线 0离线)
  online: string
  // 最后登陆IP
  login_ip: string
  // 最后登陆时间
  login_time: string
  // 后台设置数据
  backend_setting: string
  // 推荐人ID
  recommend_id: string
  // 推荐人上级ID
  recommend_up_id: string
  // 是否可接收代收订单(1是 0否)
  in_sell: string
  // 创建者
  created_by: number
  // 更新者
  updated_by: number
  // 删除者
  deleted_by: number
  // 
  created_at: string
  // 
  updated_at: string
  // 删除时间
  deleted_at: string
  // 备注
  remark: string
  // Google验证密钥
  google_secret: string
  // 是否已绑定Google验证(0否 1是)
  is_bind_google: string
}

// member查询
export function page(params: MemberVo): Promise<ResponseStruct<MemberVo[]>> {
return useHttp().get('/admin/member/member/list', { params })
}

// member远程搜索（用于下拉选择）
export function remote(params?: {
  username?: string
  phone?: string
  status?: string
}): Promise<ResponseStruct<MemberVo[]>> {
  return useHttp().get('/admin/member/member/remote', { params })
}

// member新增
export function create(data: MemberVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member', data)
}

// member编辑
export function save(id: number, data: MemberVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member/${id}`, data)
}

// member删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member', { data: ids })
}