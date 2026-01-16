# TinyMCE 富文本编辑器配置指南

## 快速开始

### 前提条件

确保 `public/tinymce/skins/` 目录包含完整的样式文件：

```
public/
└── tinymce/
    └── skins/
        ├── ui/
        │   ├── oxide/           # 默认主题
        │   │   ├── skin.css
        │   │   └── skin.min.css
        │   └── oxide-dark/      # 暗色主题
        │       ├── skin.css
        │       └── skin.min.css
        └── content/
            ├── default/         # 默认内容样式
            │   ├── content.css
            │   └── content.min.css
            └── dark/            # 暗色内容样式
                ├── content.css
                └── content.min.css
```

### 基本使用

在表单中直接使用 TinyMCE 组件：

**文件**: `src/modules/article/views/Article/components/GetFormItems.tsx`

```tsx
import { h } from 'vue'
import type { MaFormItem } from '@mineadmin/form'
import NmTinyMCE from '$/west/tinymce/views/index.vue'

export default function getFormItems(): MaFormItem[] {
  return [
    // ...其他字段
    {
      label: '文章内容',
      prop: 'content',
      render: () => h(NmTinyMCE, { height: 500 }),
    },
  ]
}
```

## 关键要点

### ✅ 正确做法

1. **样式文件**: 确保 `public/tinymce/skins/` 目录完整
2. **组件引用**: 使用正确的组件路径 `$/west/tinymce/views/index.vue`
3. **渲染方式**: 在 TSX render 函数中使用 `h()` 函数
4. **直接使用**: 无需包装组件，直接使用 `NmTinyMCE`

### ❌ 常见错误

1. ~~缺少 TinyMCE 样式文件~~
2. ~~在 render 函数中使用 JSX 语法~~
3. ~~创建不必要的包装组件~~
4. ~~添加延迟加载或可见性修复~~

## 问题排查历程

### 初始问题
在文章管理表单中集成 TinyMCE 富文本编辑器时遇到以下问题：
1. 编辑器不显示
2. 样式错位，工具栏按钮散落
3. `visibility: hidden` 导致编辑器不可见

### 排查过程

#### 第一阶段：组件引用问题
**问题**: 使用了不存在的 `<ma-tinymce>` 组件
**解决**: 改用正确的组件路径 `$/west/tinymce/views/index.vue`

#### 第二阶段：JSX渲染问题
**问题**: 在 TSX 的 render 函数中使用 JSX 语法 `<NmTinyMCE />`
**解决**: 改用 Vue 的 `h()` 函数: `h(NmTinyMCE, { height: 500 })`

#### 第三阶段：根本原因发现
**发现**: `public/tinymce/` 目录缺少必要的样式文件！
**解决**: 添加 TinyMCE 样式文件后，所有问题迎刃而解

#### 第四阶段：代码简化
**优化**: 移除不必要的包装组件和延迟加载逻辑
**结果**: 代码更简洁，编辑器立即可用

## 故障排查

如果编辑器仍然无法显示，按以下步骤检查：

### 1. 检查样式文件
```bash
ls -la public/tinymce/skins/ui/oxide/
ls -la public/tinymce/skins/ui/oxide-dark/
```

### 2. 检查浏览器控制台
查找以下错误：
- 404错误: 样式文件缺失
- TinyMCE init错误: 配置问题
- Vue render错误: 组件使用问题

### 3. 检查网络请求
在浏览器开发者工具的 Network 标签中查看：
- `skin.css` 是否成功加载
- `content.css` 是否成功加载

### 4. 检查代码
确保：
- 已导入 `h` 函数: `import { h } from 'vue'`
- 组件路径正确: `import NmTinyMCE from '$/west/tinymce/views/index.vue'`
- 使用 `h()` 函数渲染: `render: () => h(NmTinyMCE, { height: 500 })`

## 参考资源

- [TinyMCE 官方文档](https://www.tiny.cloud/docs/)
- [Vue 3 渲染函数](https://vuejs.org/guide/extras/render-function.html)
- [MineAdmin 表单系统](https://github.com/mineadmin)

---

**维护者**: Claude Code
**最后更新**: 2025-11-05
**版本**: v1.0.8
