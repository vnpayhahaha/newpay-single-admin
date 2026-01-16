import type { ResponseStruct } from "#/global";

export interface TenantAccountVo {
  // ID
  id: number;
  // 账号ID
  account_id: string;
  // 租户编号
  tenant_id: string;
  // 可用余额
  balance_available: string;
  // 冻结金额
  balance_frozen: string;
  // 账户类型:10-收款账户 20-付款账户
  account_type: number;
  // 币种
  currency: string;
  // 乐观锁版本
  version: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
}

// 租户账户查询
export function page(
  params: TenantAccountVo
): Promise<ResponseStruct<TenantAccountVo[]>> {
  return useHttp().get("/admin/tenant/tenant_account/list", { params });
}

// 租户账户新增
export function create(data: TenantAccountVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/tenant/tenant_account", data);
}

// 租户账户编辑
export function save(
  id: number,
  data: TenantAccountVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_account/${id}`, data);
}

// 租户账户删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/tenant/tenant_account", { data: ids });
}

// 修改可用余额
export function changeBalanceAvailable(
  id: number,
  change_amount: number,
  google2f_code?: string
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/tenant/tenant_account/change_balance_available`,
    {
      id,
      change_amount,
      google2f_code,
    }
  );
}

// 修改冻结余额
export function changeBalanceFrozen(
  id: number,
  change_amount: number,
  google2f_code?: string
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_account/change_balance_frozen`, {
    id,
    change_amount,
    google2f_code,
  });
}
