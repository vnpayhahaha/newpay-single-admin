import type { ResponseStruct } from "#/global";

export interface TransactionRecordVo {
  // 主键ID
  id: number;
  // 全局唯一交易流水号
  transaction_no: string;
  // 关联租户账户ID
  tenant_account_id: number;
  // 冗余账号ID
  account_id: string;
  // 冗余租户编号
  tenant_id: string;
  // 交易金额（正：收入，负：支出）
  amount: string;
  // 手续费金额
  fee_amount: string;
  // 净额（计算列）
  net_amount: string;
  // 交易前余额
  balance_before: string;
  // 交易后余额
  balance_after: string;
  // 账户变动类型（继承tenant_account类型）
  account_type: string;
  // 业务交易类型：# 基础交易类型 (1XX)
  // 100: 收款
  // 110: 付款
  // 120: 转账

  // # 退款相关 (2XX)
  // 200: 收款退款
  // 210: 付款退款

  // # 手续费类 (3XX)
  // 300: 收款手续费
  // 310: 付款手续费
  // 320: 转账手续费

  // # 资金调整 (4XX)
  // 400: 资金调增（人工）
  // 410: 资金调减（人工）
  // 420: 冻结资金
  // 430: 解冻资金

  // # 特殊交易 (9XX)
  // 900: 冲正交易
  // 910: 差错调整
  transaction_type: number;
  // 延迟模式:1-D0(立即) 2-D(自然日) 3-T(工作日)
  settlement_delay_mode: string;
  // 预计结算时间
  expected_settlement_time: string;
  // 延迟天数
  settlement_delay_days: number;
  // 节假日调整:0-不调整 1-顺延 2-提前
  holiday_adjustment: string;
  // 实际结算时间
  actual_settlement_time: string;
  // 交易对手方标识
  counterparty: string;
  // 关联业务订单号
  order_no: string;
  // 关联原交易流水号
  ref_transaction_no: string;
  // 交易状态:0-处理中 1-成功 2-失败 3-已冲正 4-等待结算
  transaction_status: string;
  // 交易备注
  remark: string;
  failed_msg: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
}

// 交易管理查询
export function page(
  params: TransactionRecordVo
): Promise<ResponseStruct<TransactionRecordVo[]>> {
  return useHttp().get("/admin/transaction/transaction_record/list", {
    params,
  });
}

// 交易管理新增
export function create(
  data: TransactionRecordVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/transaction_record", data);
}

// 交易管理编辑
export function save(
  id: number,
  data: TransactionRecordVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/transaction/transaction_record/${id}`, data);
}

// 交易管理删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/transaction_record", {
    data: ids,
  });
}
