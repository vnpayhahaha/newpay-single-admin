import type { ResponseStruct } from "#/global";

export interface TenantUserVo {
  // 用户ID
  id: number;
  // 租户编号
  tenant_id: string;
  // 用户名
  username: string;
  // 密码
  password: string;
  // 手机号码
  phone: string;
  // 头像
  avatar: string;
  // 最后登陆IP
  last_login_ip: string;
  // 最后登陆时间
  last_login_time: string;
  // 状态(1正常 2停用)
  status: boolean;
  // google验证(1正常 2停用)
  is_enabled_google: boolean;
  // Google验证密钥
  google_secret_key: string;
  // 是否已绑定Google验证(1yes 2no)
  is_bind_google: boolean;
  // 创建者
  created_by: number;
  // 创建时间
  created_at: string;
  // 更新者
  updated_by: number;
  // 更新时间
  updated_at: string;
  // 删除者
  deleted_by: number;
  // 删除时间
  deleted_at: string;
  // IP白名单
  ip_whitelist: string;
  // 备注
  remark: string;
}

// 租户成员查询
export function page(
  params: TenantUserVo
): Promise<ResponseStruct<TenantUserVo[]>> {
  return useHttp().get("/admin/tenant/tenant_user/list", { params });
}

// 租户成员新增
export function create(data: TenantUserVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/tenant/tenant_user", data);
}

// 重置租户成员密码
export function resetPassword(id: number): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/tenant/tenant_user/password", { id });
}

// 租户成员编辑
export function save(
  id: number,
  data: TenantUserVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_user/${id}`, data);
}

// 租户成员删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/tenant/tenant_user", { data: ids });
}

// 租户管理真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/tenant/tenant_user/real_delete", {
    data: ids,
  });
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/tenant/tenant_user/recovery", { ids });
}

export function selectStatus(
  fieldName: string
): Promise<ResponseStruct<Common.StatusOption[]>> {
  return useHttp().get(
    `/public/selectOption?table_name=tenant_user&field_list=${fieldName}`
  );
}

export function resetGoogle2FaSecret(
  userId: number
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/tenant/tenant_user/resetGoogle2FaSecret/${userId}`
  );
}
