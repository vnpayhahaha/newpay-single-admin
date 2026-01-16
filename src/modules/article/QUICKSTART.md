# 文章管理模块 - 快速开始

## 🎉 模块说明

本模块提供完整的文章内容管理系统(CMS)功能,包括:
- **文章分类管理**: 支持树形结构的分类体系
- **文章管理**: 富文本编辑、图片上传、分类关联等完整功能

## ⚡ 5分钟快速配置

### 1️⃣ 后台菜单配置 (2分钟)

在后台管理系统的"菜单管理"中,导入或手动添加:

**父菜单**: 文章管理 `/article`
- **子菜单1**: 文章分类管理 `/article/category` → `~/article/views/ArticleCategory/Index.vue`
- **子菜单2**: 文章管理 `/article/article` → `~/article/views/Article/Index.vue`

### 2️⃣ 权限配置 (2分钟)

在"权限管理"中添加权限代码:

**文章分类权限**:
```
article:category:list, article:category:create, article:category:update,
article:category:delete, article:category:recovery, article:category:realDelete
```

**文章权限**:
```
article:article:list, article:article:create, article:article:update,
article:article:delete, article:article:recovery, article:article:realDelete
```

### 3️⃣ 角色授权 (1分钟)

在"角色管理"中,给管理员角色分配上述权限。

### 4️⃣ 验证 (30秒)

刷新页面,左侧菜单栏应显示"文章管理"菜单组,点击即可使用!

## 📋 完整配置示例

### 菜单配置JSON(供导入)

如果系统支持JSON导入,可以使用以下配置:

```json
{
  "name": "文章管理",
  "path": "/article",
  "icon": "i-heroicons:document-text",
  "type": "directory",
  "sort": 100,
  "children": [
    {
      "name": "文章分类管理",
      "path": "/article/category",
      "component": "~/article/views/ArticleCategory/Index.vue",
      "icon": "i-heroicons:folder",
      "auth": "article:category",
      "sort": 1
    },
    {
      "name": "文章管理",
      "path": "/article/article",
      "component": "~/article/views/Article/Index.vue",
      "icon": "i-heroicons:document",
      "auth": "article:article",
      "sort": 2
    }
  ]
}
```

## 🎯 功能一览

### 文章分类功能
- ✅ 列表查询(支持搜索、分页、排序)
- ✅ 树形结构展示
- ✅ 新增/编辑/删除分类
- ✅ 父子分类关系
- ✅ 分类排序
- ✅ 回收站(软删除/恢复/永久删除)
- ✅ 批量操作

### 文章管理功能
- ✅ 列表查询(支持多条件搜索、分页)
- ✅ 新增/编辑/删除文章
- ✅ 富文本编辑器(TinyMCE)
- ✅ 缩略图上传
- ✅ 文章分类关联
- ✅ 作者信息展示
- ✅ 回收站(软删除/恢复/永久删除)
- ✅ 批量操作(删除、恢复、分类调整)

## 🔗 相关链接

- **完整文档**: [README.md](./README.md)
- **部署指南**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API文档**: [文章管理系统API接口文档.md](../../../文章管理系统API接口文档.md)

## 💡 提示

1. 首次使用请先创建分类体系,再发布文章
2. 所有删除操作默认为软删除,可在回收站恢复
3. 富文本编辑器支持插入图片、表格等多种内容
4. 支持按分类、作者、时间等多维度搜索文章

## ❓ 常见问题

**Q: 菜单不显示?**
A: 检查权限配置,确保当前角色有相应权限,尝试重新登录

**Q: 接口报错?**
A: 确认后端API已实现,检查API基础路径配置

**Q: 如何批量导入文章?**
A: 目前需手动添加,后续可扩展Excel导入功能

---

开始使用文章管理系统,体验便捷的内容管理! 🚀
