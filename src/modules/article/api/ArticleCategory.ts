import type { ResponseStruct } from "#/global";

export interface ArticleCategoryVo {
  id?: number;
  // 父级分类ID，0为顶级分类
  parent_id?: number;
  // 分类名称
  category_name?: string;
  // 排序值
  sort_order?: number;
  // 创建时间
  created_at?: string;
  // 更新时间
  updated_at?: string;
  // 删除时间
  deleted_at?: string | null;
  // 子分类数组
  children?: ArticleCategoryVo[];
  // 子分类数量
  children_count?: number;
  // 关联文章数量
  articles_count?: number;
}

// 获取分类列表
export function page(params: ArticleCategoryVo): Promise<ResponseStruct<ArticleCategoryVo[]>> {
  return useHttp().get("/admin/article/category/list", { params });
}

// 获取分类树形结构
export function tree(params?: { parent_id?: number }): Promise<ResponseStruct<ArticleCategoryVo[]>> {
  return useHttp().get("/admin/article/category/tree", { params });
}

// 获取分类详情
export function detail(id: number): Promise<ResponseStruct<ArticleCategoryVo>> {
  return useHttp().get(`/admin/article/category/${id}`);
}

// 创建分类
export function create(data: ArticleCategoryVo): Promise<ResponseStruct<ArticleCategoryVo>> {
  return useHttp().post("/admin/article/category", data);
}

// 更新分类
export function save(id: number, data: ArticleCategoryVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/article/category/${id}`, data);
}

// 删除分类（软删除）
export function deleteByIds(id: number, force?: boolean): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/article/category", { data: { id, force } });
}

// 批量删除分类
export function batchDelete(ids: number[], force?: boolean): Promise<ResponseStruct<{ deleted_count: number }>> {
  return useHttp().delete("/admin/article/category/batch", { data: { ids, force } });
}

// 获取回收站分类列表
export function recyclePage(params?: { category_name?: string }): Promise<ResponseStruct<ArticleCategoryVo[]>> {
  return useHttp().get("/admin/article/category/recycle/list", { params });
}

// 恢复分类
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/article/category/recycle/recovery", { ids });
}

// 永久删除分类
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/article/category/recycle/real_delete", { data: { ids } });
}

// 获取分类字典（用于下拉选择）
export function remote(): Promise<ResponseStruct<ArticleCategoryVo[]>> {
  return useHttp().get("/admin/article/category/tree");
}
