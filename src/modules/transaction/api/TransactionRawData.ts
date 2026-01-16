import type { ResponseStruct } from "#/global";

export interface TransactionRawDataVo {
  // 自增id
  id: string;
  // 哈希值
  hash: string;
  // 内容
  content: string;
  // 来源
  source: string;
  // 状态：0未解析 1解析成功 2解析失败
  status: string;
  // 计数
  repeat_count: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
  channel_id: number;
  bank_account_id: number;
  channel: {
    id: number;
    channel_name: string;
    channel_code: string;
    channel_icon: string;
  } | null;
  bank_account: {
    id: number;
    account_holder: string;
    account_number: string;
    branch_name: string;
    bank_code: string;
  } | null;
}

// 下载查询
export function page(
  params: TransactionRawDataVo
): Promise<ResponseStruct<TransactionRawDataVo[]>> {
  return useHttp().get("/admin/transaction/transaction_raw_data/list", {
    params,
  });
}

// 下载新增
export function create(
  data: TransactionRawDataVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/transaction_raw_data", data);
}

// 下载编辑
export function save(
  id: number,
  data: TransactionRawDataVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/transaction/transaction_raw_data/${id}`, data);
}

// 下载删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/transaction_raw_data", {
    data: ids,
  });
}
