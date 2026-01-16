import type { ResponseStruct } from "#/global";
import type { ArticleCategoryVo } from "./ArticleCategory";

export interface ArticleAuthorVo {
  id: number;
  username: string;
  nickname?: string;
  avatar?: string;
}

export interface ArticleVo {
  id?: number;
  // 文章标题
  title?: string;
  // 文章描述
  description?: string;
  // 缩略图URL
  thumbnail?: string;
  // 文章内容
  content?: string;
  // 作者ID
  author_id?: number;
  // 分类ID
  category_id?: number;
  // 创建时间
  created_at?: string;
  // 更新时间
  updated_at?: string;
  // 删除时间
  deleted_at?: string | null;
  // 分类对象
  category?: ArticleCategoryVo;
  // 作者对象
  author?: ArticleAuthorVo;
}

export interface ArticlePageResponse {
  total: number;
  page: number;
  page_size: number;
  list: ArticleVo[];
}

// 获取文章列表（分页）
export function page(params: {
  page?: number;
  per_page?: number;
  title?: string;
  description?: string;
  content?: string;
  author_id?: number;
  category_id?: number;
  include_children?: boolean;
  created_at?: string[];
  updated_at?: string[];
}): Promise<ResponseStruct<ArticlePageResponse>> {
  return useHttp().get("/admin/article/list", { params });
}

// 根据分类获取文章列表
export function getByCategory(
  categoryId: number,
  params?: {
    include_children?: boolean;
    page?: number;
    per_page?: number;
  }
): Promise<ResponseStruct<ArticlePageResponse & { category: ArticleCategoryVo }>> {
  return useHttp().get(`/admin/article/category/${categoryId}/articles`, { params });
}

// 根据作者获取文章列表
export function getByAuthor(
  authorId: number,
  params?: {
    page?: number;
    per_page?: number;
  }
): Promise<ResponseStruct<ArticlePageResponse>> {
  return useHttp().get(`/admin/article/author/${authorId}/articles`, { params });
}

// 获取文章详情
export function detail(id: number): Promise<ResponseStruct<ArticleVo>> {
  return useHttp().get(`/admin/article/${id}`);
}

// 创建文章
export function create(data: ArticleVo): Promise<ResponseStruct<ArticleVo>> {
  return useHttp().post("/admin/article", data);
}

// 更新文章
export function save(id: number, data: ArticleVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/article/${id}`, data);
}

// 删除文章（软删除）
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete(`/admin/article/${ids[0]}`);
}

// 批量删除文章
export function batchDelete(ids: number[]): Promise<ResponseStruct<{ deleted_count: number }>> {
  return useHttp().delete("/admin/article/batch", { data: { ids } });
}

// 批量更新文章分类
export function batchUpdateCategory(ids: number[], category_id: number): Promise<ResponseStruct<{ updated_count: number }>> {
  return useHttp().put("/admin/article/batch/category", { ids, category_id });
}

// 获取回收站文章列表
export function recyclePage(params?: {
  page?: number;
  per_page?: number;
  title?: string;
}): Promise<ResponseStruct<ArticlePageResponse>> {
  return useHttp().get("/admin/article/recycle/list", { params });
}

// 恢复文章
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/article/recycle/recovery", { ids });
}

// 永久删除文章
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/article/recycle/real_delete", { data: { ids } });
}
