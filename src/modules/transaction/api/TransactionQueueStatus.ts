import type { ResponseStruct } from '#/global'

export interface TransactionQueueStatusVo {
  // 主键ID
  id: number
  // 关联交易流水号
  transaction_no: string
  // 冗余业务交易类型（便于按类型调度）
  transaction_type: string
  // 队列类型:1-即时 2-延时 3-重试 4-冲正 5-定时
  queue_type: string
  // 状态:0-待处理 1-处理中 2-成功 3-失败 4-挂起 5-等待中
  process_status: string
  // 计划执行时间
  scheduled_execute_time: string
  // 下次重试时间
  next_retry_time: string
  // 重试次数
  retry_count: string
  // 乐观锁版本号
  lock_version: string
  // 错误代码
  error_code: string
  // 错误详情
  error_detail: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

// 交易队列查询
export function page(params: TransactionQueueStatusVo): Promise<ResponseStruct<TransactionQueueStatusVo[]>> {
  return useHttp().get('/admin/transaction/transaction_queue_status/list', { params })
}

// 交易队列新增
export function create(data: TransactionQueueStatusVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/transaction_queue_status', data)
}

// 交易队列编辑
export function save(id: number, data: TransactionQueueStatusVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/transaction/transaction_queue_status/${id}`, data)
}

// 交易队列删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/transaction/transaction_queue_status', { data: ids })
}
