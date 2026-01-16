import type { ResponseStruct } from "#/global";

// request_param
export interface RequestParam {
  // 参数名称
  name: string;
  // 参数类型
  type: string;
  // 参数描述
  description: string;
  // 是否必填
  required: string;
  // 默认值
  default?: string;
}

// response_param
export interface ResponseParam {
  // 参数名称
  name: string;
  // 参数类型
  type: string;
  // 参数描述
  description: string;
  // 是否必填
  required: string;
}

export interface TenantApiInterfaceVo {
  //
  id: number;
  // 接口名称
  api_name: string;
  // 接口URI
  api_uri: string;
  // 请求方式:GET,POST
  http_method: string;
  // 请求参数说明
  request_params: Array<RequestParam>;
  request_params_en: Array<RequestParam>;
  // 请求参数示例
  request_example: string;
  request_example_en: string;
  // 响应参数说明
  response_params: Array<ResponseParam>;
  response_params_en: Array<ResponseParam>;
  // 响应参数示例
  response_example: string;
  response_example_en: string;
  // 接口描述
  description: string;
  // 状态:1-启用 0-停用
  status: boolean;
  // 每秒请求限制
  rate_limit: number;
  // 认证模式 (0不需要认证 1简易签名 2复杂)
  auth_mode: number;
  // 创建人
  created_by: number;
  // 更新人
  updated_by: number;
  //
  created_at: string;
  //
  updated_at: string;
}

// openApi查询
export function page(
  params: TenantApiInterfaceVo
): Promise<ResponseStruct<TenantApiInterfaceVo[]>> {
  return useHttp().get("/admin/tenant/tenant_api_interface/list", { params });
}

// openApi新增
export function create(
  data: TenantApiInterfaceVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/tenant/tenant_api_interface", data);
}

// openApi编辑
export function save(
  id: number,
  data: TenantApiInterfaceVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant_api_interface/${id}`, data);
}

// openApi删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/tenant/tenant_api_interface", { data: ids });
}
