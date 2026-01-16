# NewPay Admin 代码规范文档索引

欢迎使用 NewPay Admin 项目！本文档帮助您快速找到所需的代码规范和最佳实践指南。

---

## 文档结构

本项目包含以下代码规范和指南文档：

### 1. **CODE_STANDARDS.md** - 完整代码规范指南（1400+ 行）

这是项目最全面的代码规范文档，适合以下场景：

- **初次加入项目**：了解项目的整体架构和代码组织方式
- **深入学习**：研究各种代码模式的详细实现
- **参考文献**：在遇到复杂问题时查找详细说明

**主要内容：**
- 组件结构模式（Index.vue、Form.vue、Get*.tsx）
- 代码风格规范（TypeScript、命名、导入、注释）
- 样式规范（SCSS、Class、UnoCSS）
- API 调用模式
- 国际化（i18n）模式
- 最佳实践和常见问题解答

**推荐阅读方式：**
从开始到结束阅读一遍，建立全面的认识。之后可作为参考书使用。

---

### 2. **CODE_PATTERNS_CHEATSHEET.md** - 代码模式速查表（760+ 行）

这是一个实用的速查表，适合以下场景：

- **快速查找**：需要立即找到某个代码模式
- **复制粘贴**：快速获取代码片段，进行最小化修改
- **新增功能**：按步骤快速搭建新模块

**主要内容：**
- 新增模块的完整步骤（8个步骤，代码完整）
- 常用代码片段（条件渲染、标签渲染、校验规则等）
- 调试技巧
- 常见错误及解决方案
- 快速参考卡

**推荐阅读方式：**
通过目录快速定位所需部分，按步骤或代码片段复制使用。

---

## 快速开始指南

### 场景1：我是新开发者，想了解项目代码规范

**建议步骤：**
1. 快速浏览 **CODE_STANDARDS.md** 的目录（5分钟）
2. 重点阅读第一、二、四、五章（30分钟）
3. 在 **CODE_PATTERNS_CHEATSHEET.md** 中找到类似的项目模块，查看实现（20分钟）
4. 开始按照规范编写代码

### 场景2：我需要快速新增一个模块

**建议步骤：**
1. 打开 **CODE_PATTERNS_CHEATSHEET.md**
2. 找到"新增模块流程"部分
3. 按照 8 个步骤逐一执行
4. 如有疑问，参考对应的 **CODE_STANDARDS.md** 章节

### 场景3：我遇到了一个常见错误

**建议步骤：**
1. 在 **CODE_PATTERNS_CHEATSHEET.md** 中找"常见错误"部分
2. 查看错误描述和解决方案
3. 如需更多背景，参考 **CODE_STANDARDS.md** 的对应章节

### 场景4：我需要实现某个特定功能（如条件渲染）

**建议步骤：**
1. 在 **CODE_PATTERNS_CHEATSHEET.md** 中找"常用代码片段"
2. 查看相关示例
3. 复制代码，根据需要修改

### 场景5：我想深入理解某个模块的架构

**建议步骤：**
1. 在真实代码中找一个相似的模块（如 channel、tenant）
2. 参考 **CODE_STANDARDS.md** 的"组件结构模式"部分
3. 对比理解实际代码

---

## 文档快速导航

### CODE_STANDARDS.md 章节导航

| 章节 | 内容 | 用途 |
|------|------|------|
| 第一章 | 组件结构模式 | 理解项目如何组织文件和代码 |
| 第二章 | 代码风格 | 学习 TypeScript、命名、导入顺序 |
| 第三章 | 样式规范 | 了解如何使用 SCSS 和 UnoCSS |
| 第四章 | API 调用模式 | 掌握如何与后端交互 |
| 第五章 | 国际化模式 | 学习多语言支持 |
| 第六章 | 最佳实践 | 了解常见的做法和避免的错误 |
| 第七章 | 常见问题 | 快速找到答案 |
| 第八章 | 路径别名 | 了解导入路径的简写 |
| 第九章 | 依赖包说明 | 了解项目使用的核心包 |

### CODE_PATTERNS_CHEATSHEET.md 部分导航

| 部分 | 内容 | 场景 |
|------|------|------|
| 新增模块流程 | 8 个步骤，完整代码 | 添加新功能模块 |
| 常用代码片段 | 8 个常见实现 | 快速查找实现方式 |
| 调试技巧 | 调试 Vue、API、数据 | 排查问题 |
| 常见错误 | 6 个常见错误及解决 | 修复问题 |
| 快速参考卡 | 命名规则、快捷键 | 快速查询 |

---

## 关键概念速查

### 文件组织

```
src/modules/
├── {moduleName}/
│   ├── views/{EntityName}/
│   │   ├── index.vue              # 列表页
│   │   ├── Form.vue               # 表单
│   │   └── components/
│   │       ├── GetTableColumns.tsx # 表格列
│   │       ├── GetFormItems.tsx    # 表单项
│   │       └── GetSearchItems.tsx  # 搜索项
│   ├── api/{EntityName}.ts        # API
│   └── locales/                   # 国际化
```

### 核心组件类型

- **Index.vue** - 列表页面，使用 MaProTable
- **Form.vue** - 编辑/创建表单，使用 ma-form
- **GetTableColumns.tsx** - 定义表格列的数组
- **GetFormItems.tsx** - 定义表单项的数组
- **GetSearchItems.tsx** - 定义搜索项的数组

### 核心 Hook

- `useDialog()` - 对话框
- `useForm()` - 表单引用
- `useMessage()` - 消息提示
- `useTrans()` - 国际化

### 核心工具函数

- `ResultCode` - 响应码枚举
- `hasAuth()` - 权限检查
- `selectStatus()` - 获取下拉框选项

---

## 代码审查检查清单

在提交代码前，请参考以下清单：

- [ ] 文件结构是否符合项目规范（组件、API、国际化分离）
- [ ] TypeScript 类型是否完整（避免 any）
- [ ] 导入语句是否按照规定顺序组织
- [ ] 所有 API 调用是否都有错误处理（.catch）
- [ ] 是否添加了国际化文本（不应有硬编码的中文或英文）
- [ ] 表格列和表单项是否使用了正确的组件配置
- [ ] 权限检查是否完整（是否需要 v-auth）
- [ ] 代码是否通过了 `npm run lint`
- [ ] 组件是否使用了 `defineOptions({ name: 'module:entity' })`

---

## 项目结构一览

### 完整目录树

```
cnewpay-admin/
├── CODE_STANDARDS.md              # 本文档
├── CODE_PATTERNS_CHEATSHEET.md    # 速查表
├── README_CODE_STANDARDS.md       # 索引（您在这里）
├── src/
│   ├── modules/                   # 业务模块（核心）
│   │   ├── channel/               # 渠道模块
│   │   ├── tenant/                # 租户模块
│   │   ├── member/                # 会员模块
│   │   ├── transaction/           # 交易模块
│   │   └── article/               # 文章模块
│   ├── hooks/                     # React-style hooks
│   │   ├── useDialog.ts
│   │   ├── useMessage.ts
│   │   └── ...
│   ├── utils/                     # 工具函数
│   │   ├── ResultCode.ts
│   │   ├── permission/
│   │   └── ...
│   ├── plugins/                   # 插件（mine-admin、west）
│   ├── store/                     # Pinia 状态管理
│   ├── router/                    # 路由配置
│   ├── components/                # 全局组件
│   └── assets/                    # 静态资源
├── types/                         # TypeScript 类型定义
├── eslint.config.js               # ESLint 配置
├── tsconfig.json                  # TypeScript 配置
├── .editorconfig                  # 编辑器配置
└── package.json                   # 项目配置
```

---

## 开发工具和命令

### 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 生产构建
npm run serve            # 本地预览

# 代码质量
npm run lint             # 运行所有 linter
npm run lint:tsc         # TypeScript 检查
npm run lint:eslint      # ESLint（自动修复）
npm run lint:stylelint   # Stylelint（自动修复）

# 工具
npm run gen:icons        # 生成图标数据
npm run svgo             # 优化 SVG 图标
```

### 推荐的 VSCode 扩展

- Vue - Official
- TypeScript Vue Plugin
- ESLint
- Prettier
- TailwindCSS IntelliSense
- EditorConfig for VS Code

---

## 学习路径建议

### 第1天：理解架构（2-3小时）
1. 阅读 CODE_STANDARDS.md 第一章（组件结构模式）
2. 浏览现有模块的代码结构（channel、tenant）
3. 理解 Index.vue、Form.vue、Get*.tsx 的作用

### 第2天：掌握代码风格（2小时）
1. 阅读 CODE_STANDARDS.md 第二、三章
2. 运行 `npm run lint` 理解规则
3. 查看几个现有文件，理解编码风格

### 第3天：学习 API 和国际化（2小时）
1. 阅读 CODE_STANDARDS.md 第四、五章
2. 查看 API 文件的实现
3. 查看国际化文件的组织

### 第4天：动手实践（3-4小时）
1. 按照 CODE_PATTERNS_CHEATSHEET.md 新增一个简单的模块
2. 运行 `npm run lint` 检查代码
3. 测试基本功能

### 持续：参考和优化
1. 在开发中遇到问题时，查阅相应文档
2. 定期运行 `npm run lint` 保持代码质量
3. 参考最佳实践改进代码

---

## 常见问题

### Q: 文档有多大？
A: CODE_STANDARDS.md 约 1400 行，CODE_PATTERNS_CHEATSHEET.md 约 760 行。总共 2100+ 行，包含完整的代码示例。

### Q: 我应该读完所有文档吗？
A: 不必。新手可以先快速浏览，然后根据需要深入阅读相关部分。

### Q: 文档如何保持最新？
A: 随着项目进展，这些文档应该定期更新。如发现不准确之处，请提出 issue。

### Q: 如何快速找到某个话题？
A: 使用 Ctrl+F（或 Cmd+F）搜索关键词，或查看目录快速导航。

### Q: 代码示例都是最新的吗？
A: 是的，这些文档是基于最新代码审查生成的。

---

## 贡献指南

如果您发现文档的错误或有改进建议：

1. **提交 Issue**：描述问题或建议
2. **提交 PR**：直接改进文档
3. **反馈**：在团队讨论中提出意见

---

## 相关资源

- **项目仓库**：[GitHub](https://github.com/mineadmin)
- **MineAdmin 文档**：[官方文档](https://mineadmin.com)
- **Vue 3 文档**：[Vue.js](https://vuejs.org)
- **TypeScript 文档**：[TypeScript](https://www.typescriptlang.org)
- **Element Plus**：[UI 组件库](https://element-plus.org)

---

## 文档维护信息

- **生成时间**：2024-12-16
- **文档版本**：1.0
- **覆盖范围**：channel、tenant、member、transaction 模块
- **代码库状态**：main 分支（最新）

---

## 快速帮助

遇到问题？这里有解决方案：

| 问题 | 文档位置 |
|------|---------|
| 如何新增模块？ | CODE_PATTERNS_CHEATSHEET.md - 新增模块流程 |
| 组件结构是什么？ | CODE_STANDARDS.md 第一章 |
| 如何使用国际化？ | CODE_STANDARDS.md 第五章 |
| 常见错误有哪些？ | CODE_PATTERNS_CHEATSHEET.md - 常见错误 |
| 如何调试代码？ | CODE_PATTERNS_CHEATSHEET.md - 调试技巧 |
| API 怎么写？ | CODE_STANDARDS.md 第四章 |
| 代码风格是什么？ | CODE_STANDARDS.md 第二章 |
| 样式怎么写？ | CODE_STANDARDS.md 第三章 |

---

**祝您开发愉快！如有问题，请查阅相关文档或联系团队。**

