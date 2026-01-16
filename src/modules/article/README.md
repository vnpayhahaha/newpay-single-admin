# 文章管理模块

本模块提供了完整的文章管理功能,包括文章分类和文章内容的管理。

## 功能特性

### 文章分类管理
- ✅ 分类列表展示
- ✅ 树形分类结构支持
- ✅ 分类增删改查
- ✅ 分类排序
- ✅ 回收站功能
- ✅ 批量操作

### 文章管理
- ✅ 文章列表展示(分页)
- ✅ 富文本编辑器支持
- ✅ 文章增删改查
- ✅ 分类关联
- ✅ 作者关联
- ✅ 缩略图上传
- ✅ 回收站功能
- ✅ 批量操作
- ✅ 批量分类调整

## 目录结构

```
src/modules/article/
├── api/                          # API接口
│   ├── ArticleCategory.ts        # 文章分类接口
│   └── Article.ts                # 文章接口
├── locales/                      # 多语言文件
│   ├── zh_CN[简体中文].yaml
│   ├── en[English].yaml
│   └── zh_TW[繁體中文].yaml
└── views/                        # 页面组件
    ├── ArticleCategory/          # 文章分类管理
    │   ├── Index.vue             # 列表页
    │   ├── Form.vue              # 表单页
    │   └── components/           # 组件
    │       ├── GetTableColumns.tsx
    │       ├── GetSearchItems.tsx
    │       └── GetFormItems.tsx
    └── Article/                  # 文章管理
        ├── Index.vue             # 列表页
        ├── Form.vue              # 表单页
        └── components/           # 组件
            ├── GetTableColumns.tsx
            ├── GetSearchItems.tsx
            └── GetFormItems.tsx
```

## 菜单配置

本系统使用动态菜单系统,需要在后台管理中配置以下菜单:

### 文章管理菜单组

**父级菜单 - 文章管理**
- 名称: 文章管理
- 路由: /article
- 图标: i-heroicons:document-text
- 排序: 根据需要设置

**子菜单 - 文章分类**
- 名称: 文章分类管理
- 路由: /article/category
- 组件路径: `~/article/views/ArticleCategory/Index.vue`
- 权限标识: `article:category`
- 图标: i-heroicons:folder

**子菜单 - 文章管理**
- 名称: 文章管理
- 路由: /article/article
- 组件路径: `~/article/views/Article/Index.vue`
- 权限标识: `article:article`
- 图标: i-heroicons:document

## 权限配置

需要在权限管理中配置以下权限代码:

### 文章分类权限
- `article:category:list` - 查看分类列表
- `article:category:detail` - 查看分类详情
- `article:category:create` - 创建分类
- `article:category:update` - 更新分类
- `article:category:delete` - 删除分类(软删除)
- `article:category:recovery` - 恢复分类
- `article:category:realDelete` - 永久删除分类

### 文章权限
- `article:article:list` - 查看文章列表
- `article:article:detail` - 查看文章详情
- `article:article:create` - 创建文章
- `article:article:update` - 更新文章
- `article:article:delete` - 删除文章(软删除)
- `article:article:recovery` - 恢复文章
- `article:article:realDelete` - 永久删除文章

## API接口

所有API接口已按照接口文档实现,详见:
- [文章管理系统API接口文档.md](../../../文章管理系统API接口文档.md)

### 接口基础路径
- 文章分类: `/admin/article/category`
- 文章管理: `/admin/article`

## 使用说明

### 1. 配置菜单
在后台管理系统的菜单管理中,按照上述"菜单配置"部分添加菜单项。

### 2. 配置权限
在权限管理中,按照上述"权限配置"部分添加权限代码,并分配给相应角色。

### 3. 开始使用
- 首先进入"文章分类管理"创建分类体系
- 然后进入"文章管理"创建和管理文章
- 支持富文本编辑、图片上传等功能

## 技术特性

- **Vue 3 + TypeScript**: 使用最新的Vue 3 Composition API
- **TSX**: 表格列、搜索项、表单项使用TSX编写,更灵活
- **Element Plus**: UI组件库
- **MineAdmin框架**: 基于MineAdmin Pro Table、Form等组件
- **权限控制**: 完整的RBAC权限控制
- **国际化**: 支持中文简体、繁体、英文
- **回收站**: 支持软删除和恢复功能

## 数据模型

### 文章分类 (ArticleCategory)
```typescript
{
  id: number              // 分类ID
  parent_id: number       // 父级分类ID (0为顶级)
  category_name: string   // 分类名称
  sort_order: number      // 排序值
  created_at: string      // 创建时间
  updated_at: string      // 更新时间
  deleted_at: string|null // 删除时间
}
```

### 文章 (Article)
```typescript
{
  id: number              // 文章ID
  title: string           // 标题
  description: string     // 描述
  thumbnail: string       // 缩略图URL
  content: string         // 内容(HTML)
  author_id: number       // 作者ID
  category_id: number     // 分类ID
  created_at: string      // 创建时间
  updated_at: string      // 更新时间
  deleted_at: string|null // 删除时间
}
```

## 注意事项

1. **富文本编辑器**: 使用TinyMCE编辑器,确保已正确配置
2. **图片上传**: 使用`ma-upload-image`组件,需要配置上传接口
3. **权限验证**: 所有操作按钮都有权限验证
4. **软删除**: 删除操作默认为软删除,可在回收站恢复
5. **分类树**: 支持无限层级的树形结构

## 开发者

- 基于 MineAdmin 框架开发
- 遵循项目统一的代码规范和架构模式
