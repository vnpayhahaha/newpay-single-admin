import type { ResponseStruct } from "#/global";

export interface TransactionParsingRulesVo {
  // 自增id
  id: string;
  // 渠道ID
  channel_id: string;
  // 正则表达式
  regex: string;
  // 提取变量名
  variable_name: string;
  // 示例数据
  example_data: string;
  // 状态：1启用 0禁用
  status: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
  // 删除时间
  deleted_at: string;
  parse_result: Array<{
    label: string;
    value: string | number;
  }>;
}

// 解析规则查询
export function page(
  params: TransactionParsingRulesVo
): Promise<ResponseStruct<TransactionParsingRulesVo[]>> {
  return useHttp().get("/admin/transaction/transaction_parsing_rules/list", {
    params,
  });
}

// 解析规则新增
export function create(
  data: TransactionParsingRulesVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/transaction_parsing_rules", data);
}

// 解析规则编辑
export function save(
  id: number,
  data: TransactionParsingRulesVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/transaction_parsing_rules/${id}`,
    data
  );
}

// 解析规则删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/transaction_parsing_rules", {
    data: ids,
  });
}

// 真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete(
    "/admin/transaction/transaction_parsing_rules/real_delete",
    {
      data: ids,
    }
  );
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put(
    "/admin/transaction/transaction_parsing_rules/recovery",
    { ids }
  );
}
