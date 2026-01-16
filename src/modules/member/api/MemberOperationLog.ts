import type { ResponseStruct } from '#/global'

export interface MemberOperationLogVo {
  // 
  id: number
  // 客户ID
  member_id: number
  // 用户名
  username: string
  // 请求方式
  method: string
  // 请求路由
  router: string
  // 业务名称
  service_name: string
  // 请求IP地址
  ip: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
  // 备注
  remark: string
  // 请求参数
  request_params: string
  // 响应状态码
  response_status: string
  // 操作是否成功(1:成功,0:失败)
  is_success: string
  // 响应数据
  response_data: string
  // uuid
  request_id: string
  // 请求耗时(毫秒)
  request_duration: number
}

// member_operation_log查询
export function page(params: MemberOperationLogVo): Promise<ResponseStruct<MemberOperationLogVo[]>> {
return useHttp().get('/admin/member/member_operation_log/list', { params })
}

// member_operation_log新增
export function create(data: MemberOperationLogVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/member/member_operation_log', data)
}

// member_operation_log编辑
export function save(id: number, data: MemberOperationLogVo): Promise<ResponseStruct<null>> {
    return useHttp().put(`/admin/member/member_operation_log/${id}`, data)
}

// member_operation_log删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
      return useHttp().delete('/admin/member/member_operation_log', { data: ids })
}