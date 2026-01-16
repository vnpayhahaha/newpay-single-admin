import type { ResponseStruct } from "#/global";

export interface ChannelConfigVo {
  value: string;
  label: string;
  // 根据实际结构补充字段
}
export interface ChannelVo {
  //
  id: number;
  // 渠道编码
  channel_code: string;
  // 渠道名称
  channel_name: string;
  // 渠道图标
  channel_icon: string;
  // 国家代码(IN=印度)
  country_code: string;
  // 默认币种
  currency: string;
  // API基础地址
  api_base_url: string;
  // 文档地址
  doc_url: string;
  // 支持代收
  support_collection: boolean;
  // 支持代付
  support_disbursement: boolean;
  // 渠道配置(JSON)
  config: Array<ChannelConfigVo>;
  // 状态:1-启用 2-停用
  status: boolean;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
}

// channel查询
export function page(params: ChannelVo): Promise<ResponseStruct<ChannelVo[]>> {
  return useHttp().get("/admin/channel/channel/list", { params });
}

// channel新增
export function create(data: ChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/channel/channel", data);
}

// channel编辑
export function save(
  id: number,
  data: ChannelVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel/${id}`, data);
}

// channel删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel", { data: ids });
}
// channel真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel/real_delete", { data: ids });
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/channel/channel/recovery", { ids });
}

export interface ChannelDictVoConfig {
  value: string;
  label: string;
}
export interface ChannelDictVo {
  // 'id',
  // 'channel_code',
  // 'channel_name',
  // 'channel_type',
  // 'currency',
  // 'status',
  // 'support_collection',
  // 'support_disbursement',
  id: string;
  channel_code: string;
  channel_name: string;
  channel_type: number;
  currency: string;
  status: boolean;
  support_collection: boolean;
  support_disbursement: boolean;
  config: Array<ChannelDictVoConfig>;
}

export function remote(params?: {
  channel_type?: number;
  support_collection?: number;
  status?: number;
  support_disbursement?: number;
}): Promise<ResponseStruct<ChannelDictVo[]>> {
  return useHttp().get("/admin/channel/channel_dict/remote", { params });
}
