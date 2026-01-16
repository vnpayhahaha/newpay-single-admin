import type { ResponseStruct } from '#/global'

export interface ChannelCallbackRecordVo {
  // 主键ID
  id: number
  // 回调唯一标识
  callback_id: string
  // 渠道ID
  channel_id: number
  // 原始请求ID(关联请求记录)
  original_request_id: string
  // 回调类型(如:支付结果通知、异步通知等)
  callback_type: string
  // 回调请求的完整地址
  callback_url: string
  // 回调请求的HTTP方法(GET/POST/PUT等)
  callback_http_method: string
  // 回调参数(JSON格式)
  callback_params: string
  // 回调头信息(JSON格式)
  callback_headers: string
  // 回调体内容
  callback_body: string
  // 回调到达时间
  callback_time: string
  // 回调来源IP
  client_ip: string
  // 验签状态: 0-未验签, 1-验签成功, 2-验签失败
  status: number
  // 返回给渠道的内容
  response_content: string
  // 处理结果描述
  process_result: string
  // 处理耗时(毫秒)
  elapsed_time: string
  // 创建时间
  created_at: string
  channel: {
    channel_code: string;
    channel_icon: string;
    channel_name: string;
    id: number;
  };
}

// 渠道回调记录查询
export function page(params: ChannelCallbackRecordVo): Promise<ResponseStruct<ChannelCallbackRecordVo[]>> {
  return useHttp().get('/admin/channel/channel_callback_record/list', { params })
}

// 渠道回调记录新增
export function create(data: ChannelCallbackRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/channel/channel_callback_record', data)
}

// 渠道回调记录编辑
export function save(id: number, data: ChannelCallbackRecordVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel_callback_record/${id}`, data)
}

// 渠道回调记录删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/channel/channel_callback_record', { data: ids })
}
