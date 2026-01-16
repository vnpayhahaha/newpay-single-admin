# 文章管理模块 - 部署指南

## 📦 模块已完成

文章管理模块已完全开发完成,包含以下内容:

### ✅ 已完成的功能

#### 1. 文章分类管理
- [x] 分类列表展示(支持分页和搜索)
- [x] 树形分类结构
- [x] 分类CRUD操作
- [x] 分类排序
- [x] 回收站功能
- [x] 批量删除/恢复/永久删除

#### 2. 文章管理
- [x] 文章列表展示(分页、搜索、过滤)
- [x] 富文本编辑器(TinyMCE)
- [x] 文章CRUD操作
- [x] 缩略图上传
- [x] 分类关联选择
- [x] 作者信息展示
- [x] 回收站功能
- [x] 批量操作(删除、恢复、分类调整)

#### 3. 支持功能
- [x] 完整的权限控制
- [x] 多语言支持(中文简体/繁体/英文)
- [x] 软删除机制
- [x] API接口完整实现

### 📁 文件清单

```
src/modules/article/
├── api/
│   ├── ArticleCategory.ts        ✅ 文章分类API
│   └── Article.ts                ✅ 文章API
├── locales/
│   ├── zh_CN[简体中文].yaml      ✅ 中文简体
│   ├── en[English].yaml          ✅ 英文
│   └── zh_TW[繁體中文].yaml      ✅ 中文繁体
├── views/
│   ├── ArticleCategory/          ✅ 文章分类管理
│   │   ├── Index.vue
│   │   ├── Form.vue
│   │   └── components/
│   │       ├── GetTableColumns.tsx
│   │       ├── GetSearchItems.tsx
│   │       └── GetFormItems.tsx
│   └── Article/                  ✅ 文章管理
│       ├── Index.vue
│       ├── Form.vue
│       └── components/
│           ├── GetTableColumns.tsx
│           ├── GetSearchItems.tsx
│           └── GetFormItems.tsx
└── README.md                     ✅ 模块文档
```

## 🚀 部署步骤

### 第一步: 配置后台菜单

登录后台管理系统,在 **菜单管理** 中添加以下菜单:

#### 1. 创建父级菜单

```
菜单名称: 文章管理
菜单类型: 目录
路由地址: /article
图标: i-heroicons:document-text
排序: 100 (可根据实际调整)
```

#### 2. 创建子菜单 - 文章分类

```
菜单名称: 文章分类管理
菜单类型: 菜单
父级菜单: 文章管理
路由地址: /article/category
组件路径: ~/article/views/ArticleCategory/Index.vue
权限标识: article:category
图标: i-heroicons:folder
排序: 1
```

#### 3. 创建子菜单 - 文章管理

```
菜单名称: 文章管理
菜单类型: 菜单
父级菜单: 文章管理
路由地址: /article/article
组件路径: ~/article/views/Article/Index.vue
权限标识: article:article
图标: i-heroicons:document
排序: 2
```

### 第二步: 配置权限

在 **权限管理** 中添加以下权限代码:

#### 文章分类权限组

```
权限组名称: 文章分类管理
权限代码:
  - article:category:list       # 查看分类列表
  - article:category:detail     # 查看分类详情
  - article:category:create     # 创建分类
  - article:category:update     # 更新分类
  - article:category:delete     # 删除分类
  - article:category:recovery   # 恢复分类
  - article:category:realDelete # 永久删除分类
```

#### 文章权限组

```
权限组名称: 文章管理
权限代码:
  - article:article:list        # 查看文章列表
  - article:article:detail      # 查看文章详情
  - article:article:create      # 创建文章
  - article:article:update      # 更新文章
  - article:article:delete      # 删除文章
  - article:article:recovery    # 恢复文章
  - article:article:realDelete  # 永久删除文章
```

### 第三步: 分配权限给角色

在 **角色管理** 中,为相应角色分配上述权限。

### 第四步: 验证部署

1. **刷新页面** - 重新登录或刷新页面
2. **检查菜单** - 左侧菜单栏应该显示"文章管理"菜单组
3. **测试功能**:
   - 点击"文章分类管理",测试分类的增删改查
   - 点击"文章管理",测试文章的增删改查
   - 测试回收站功能
   - 测试批量操作

## 🔧 配置说明

### API基础路径

确保后端API已实现以下接口(参考 `文章管理系统API接口文档.md`):

- 文章分类: `/admin/article/category/*`
- 文章管理: `/admin/article/*`

### 环境变量

确保以下环境变量已正确配置:

```env
VITE_APP_API_BASEURL=http://your-api-domain.com
VITE_PROXY_PREFIX=/admin
```

### 富文本编辑器

文章内容使用TinyMCE编辑器,确保已安装相关依赖:

```bash
# 如需额外配置,请参考项目的TinyMCE配置
```

### 图片上传

缩略图使用 `ma-upload-image` 组件,需要配置上传接口。请在项目配置中设置:

```typescript
// 上传配置通常在 src/config 或环境变量中
uploadConfig: {
  imageUploadUrl: '/admin/upload/image'
}
```

## 📝 使用流程

### 1. 创建分类体系

1. 进入 **文章分类管理**
2. 点击 **新增** 按钮
3. 填写分类名称、选择父级分类(可选)、设置排序值
4. 保存后即可创建分层级的分类结构

### 2. 发布文章

1. 进入 **文章管理**
2. 点击 **新增** 按钮
3. 填写文章信息:
   - 标题(必填)
   - 描述(可选)
   - 上传缩略图(可选)
   - 选择文章分类
   - 设置作者ID(可选,默认当前用户)
   - 编辑文章内容(富文本)
4. 保存发布

### 3. 管理文章

- **搜索**: 支持按标题、描述、内容、分类、作者等搜索
- **编辑**: 点击操作列的编辑按钮
- **删除**: 软删除,可在回收站恢复
- **批量操作**: 选择多条记录进行批量删除或恢复
- **分类调整**: 批量修改文章所属分类

## 🔍 故障排查

### 菜单不显示

1. 检查是否已在后台添加菜单
2. 检查当前角色是否有相应权限
3. 尝试重新登录或清除缓存

### 接口报错

1. 检查API基础路径配置
2. 查看浏览器控制台网络请求
3. 确认后端接口已正确实现
4. 检查权限代码是否匹配

### 富文本编辑器异常

1. 检查TinyMCE相关依赖是否已安装
2. 查看浏览器控制台错误信息
3. 确认编辑器配置正确

### 图片上传失败

1. 检查上传接口配置
2. 确认文件大小限制
3. 查看服务器上传权限

## 📚 相关文档

- [文章管理系统API接口文档.md](../../../文章管理系统API接口文档.md) - 完整的API接口说明
- [README.md](./README.md) - 模块详细文档
- [CLAUDE.md](../../../CLAUDE.md) - 项目开发规范

## 🎯 后续扩展

可选的功能扩展方向:

- [ ] 文章标签系统
- [ ] 文章评论功能
- [ ] 文章浏览统计
- [ ] SEO优化配置
- [ ] 文章版本历史
- [ ] 文章定时发布
- [ ] 文章状态(草稿/发布/下线)
- [ ] 文章推荐/置顶

## ⚠️ 注意事项

1. **权限控制**: 所有操作都有权限验证,确保权限配置完整
2. **软删除**: 默认为软删除,数据会保留在回收站
3. **永久删除**: 永久删除操作不可恢复,需谨慎操作
4. **分类依赖**: 删除有子分类或关联文章的分类会失败(除非强制删除)
5. **数据备份**: 建议定期备份数据库

## 💡 技术支持

如遇到问题,可以:

1. 查看浏览器控制台错误信息
2. 检查后端日志
3. 参考API接口文档
4. 联系开发团队

---

**开发完成时间**: 2025-11-05
**开发框架**: Vue 3 + TypeScript + MineAdmin
**API文档版本**: v1.0
