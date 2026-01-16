import type { ResponseStruct } from '#/global'

export interface ChannelRequestRecordVo {
  // 主键ID
  id: number
  // 请求唯一标识
  request_id: string
  // 渠道ID
  channel_id: number
  // 调用的API方法说明
  api_method: string
  // 完整请求地址
  request_url: string
  // HTTP请求方法(GET/POST/PUT/DELETE等)
  http_method: string
  // 请求参数(JSON格式)
  request_params: string
  // 请求头信息(JSON格式)
  request_headers: string
  // 请求体内容
  request_body: string
  // 请求时间
  request_time: string
  // HTTP响应状态码
  http_status_code: number
  // 业务响应状态(如渠道返回的status/code字段)
  response_status: string
  // 响应头信息(JSON格式)
  response_headers: string
  // 响应体内容
  response_body: string
  // 错误信息
  error_message: string
  // 响应时间
  response_time: string
  // 耗时(毫秒)
  elapsed_time: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
  channel: {
    channel_code: string;
    channel_icon: string;
    channel_name: string;
    id: number;
  };
}

// 渠道请求记录查询
export function page(params: ChannelRequestRecordVo): Promise<ResponseStruct<ChannelRequestRecordVo[]>> {
  return useHttp().get('/admin/channel/channel_request_record/list', { params })
}

// 渠道请求记录新增
export function create(data: ChannelRequestRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/channel/channel_request_record', data)
}

// 渠道请求记录编辑
export function save(id: number, data: ChannelRequestRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel_request_record/${id}`, data)
}

// 渠道请求记录删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/channel/channel_request_record', { data: ids })
}
