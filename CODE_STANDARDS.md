# NewPay Admin 代码结构与规范分析报告

> 本报告基于详细的代码审查，覆盖 src/modules 下的 base、channel、tenant、transaction 和 member 等模块

---

## 目录

1. [组件结构模式](#组件结构模式)
2. [代码风格](#代码风格)
3. [样式规范](#样式规范)
4. [API 调用模式](#api-调用模式)
5. [国际化（i18n）模式](#国际化模式)
6. [最佳实践总结](#最佳实践总结)

---

## 一、组件结构模式

### 1.1 标准的模块目录结构

每个业务模块遵循统一的文件夹结构：

```
src/modules/{module_name}/
├── views/                    # 视图层
│   ├── {Entity1}/
│   │   ├── index.vue        # 列表页面
│   │   ├── Form.vue         # 创建/编辑表单
│   │   └── components/
│   │       ├── GetTableColumns.tsx      # 表格列定义
│   │       ├── GetFormItems.tsx         # 表单项定义
│   │       └── GetSearchItems.tsx       # 搜索表单定义
│   └── {Entity2}/
│       ├── Index.vue
│       ├── Form.vue
│       └── components/
├── api/                      # API 层
│   ├── {Entity1}.ts
│   └── {Entity2}.ts
└── locales/                  # 国际化
    ├── en[English].yaml
    ├── zh_CN[简体中文].yaml
    └── zh_TW[繁體中文].yaml
```

**实际例子：**
- `/src/modules/channel/views/Channel/` - 渠道管理
- `/src/modules/tenant/views/Tenant/` - 租户管理
- `/src/modules/member/views/Member/` - 会员管理
- `/src/modules/transaction/views/CollectionOrder/` - 收款订单

---

### 1.2 Index.vue（列表页面）的结构

#### 特征：
1. **Setup 脚本语言**：使用 `<script setup lang="tsx">`
2. **类型定义**：完整的 TypeScript 类型标注
3. **核心内容**：
   - 表格代理引用（MaProTableExpose）
   - 表单引用和状态管理
   - 对话框配置（useDialog Hook）
   - MaProTable 组件配置

#### 标准代码结构示例：

```vue
<!--
 - MineAdmin 标准注释头
 - 包含许可证和作者信息
-->
<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

// 1. API 导入（使用 ~/ 路径别名）
import { deleteByIds, page, realDelete, recovery } from '~/channel/api/Channel.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'

// 2. Hooks 和工具导入
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import { useProTableToolbar } from '@mineadmin/pro-table'
import MaRecycle from '@/components/ma-recycle/index.vue'

// 3. 组件导入
import Form from './Form.vue'

// 4. 定义组件
defineOptions({ name: 'channel:channel' })

// 5. 声明引用
const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const selections = ref<any[]>([])

// 6. 国际化
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()

// 7. 对话框配置
const maDialog: UseDialogExpose = useDialog({
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      elForm.validate().then(() => {
        // 处理保存逻辑
      }).catch()
    }
    okLoadingState(false)
  },
})

// 8. 表格配置
const options = ref<MaProTableOptions>({
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('channel.index'),
  },
  tableOptions: {
    on: {
      onSelectionChange: (selection: any[]) => selections.value = selection,
    },
  },
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t('crud.search'),
      resetBtn: () => t('crud.reset'),
    },
  },
  searchFormOptions: { labelWidth: '150px' },
  requestOptions: {
    api: page,
  },
})

// 9. 表格架构
const schema = ref<MaProTableSchema>({
  searchItems: getSearchItems(t),
  tableColumns: getTableColumns(maDialog, formRef, t),
})

// 10. 批量操作
function handleDelete() {
  const ids = selections.value.map((item: any) => item.id)
  msg.delConfirm(t('crud.delMessage')).then(async () => {
    const response = await deleteByIds(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.delSuccess'))
      proTableRef.value.refresh()
    }
  })
}
</script>

<template>
  <div class="mine-layout pt-3">
    <!-- MaProTable 是核心表格组件 -->
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <!-- 新增按钮 -->
      <template #actions>
        <el-button
          v-auth="['channel:channel:save']"
          type="primary"
          @click="() => {
            maDialog.setTitle(t('crud.add'))
            maDialog.open({ formType: 'add' })
          }"
        >
          {{ t('crud.add') }}
        </el-button>
      </template>

      <!-- 工具栏左侧按钮 -->
      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['channel:channel:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.delete') }}
          </el-button>
        </el-button-group>
      </template>

      <!-- 空数据提示 -->
      <template #empty>
        <el-empty>
          <el-button type="primary" @click="() => maDialog.open({ formType: 'add' })">
            {{ t('crud.add') }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <!-- 对话框 -->
    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <Form ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">
// 通常为空，样式由全局主题和 UnoCSS 提供
</style>
```

---

### 1.3 Form.vue（表单组件）的结构

#### 关键特点：
1. 使用 `<script setup lang="ts">`（不是 TSX）
2. Props 定义了 `formType` 和 `data`
3. 动态设置表单项和配置

#### 标准实现：

```vue
<script setup lang="ts">
import type { ChannelVo } from '~/channel/api/Channel.ts'
import { create, save } from '~/channel/api/Channel.ts'
import getFormItems from './components/GetFormItems.tsx'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

// Props 定义
const { formType = 'add', data = null } = defineProps<{
  formType: 'add' | 'edit'
  data?: ChannelVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<ChannelVo>({})

// 使用 useForm Hook
useForm('maFormRef').then((form: MaFormExpose) => {
  // 编辑时，将数据复制到 formModel
  if (formType === 'edit' && data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
  }
  // 设置表单项
  form.setItems(getFormItems(formType, t, formModel.value))
  form.setOptions({
    labelWidth: '150px',
  })
})

// 创建操作
function add(): Promise<any> {
  return new Promise((resolve, reject) => {
    create(formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 更新操作
function edit(): Promise<any> {
  return new Promise((resolve, reject) => {
    save(formModel.value.id as number, formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 暴露给父组件
defineExpose({
  add,
  edit,
  maForm: maFormRef,
})
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss">
</style>
```

---

### 1.4 GetTableColumns.tsx（表格列定义）的结构

#### 关键特点：
1. **文件格式**：TSX（不是 TypeScript）
2. **导出默认函数**：接收 dialog、formRef、翻译函数
3. **返回 MaProTableColumns 数组**

#### 标准实现：

```tsx
/**
 * MineAdmin 标准注释
 * @Author X.Mo<root@imoi.cn>
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { ChannelVo } from '~/channel/api/Channel.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, save } from '~/channel/api/Channel.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { selectStatus } from '@/modules/Common'

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ChannelVo) => {
    return hasAuth(auth)
  }

  return [
    // 1. 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    
    // 2. 索引列
    { type: 'index' },
    
    // 3. 普通列
    { label: () => t('channel.channel_code'), prop: 'channel_code' },
    { label: () => t('channel.channel_name'), prop: 'channel_name' },
    
    // 4. 带自定义渲染的列（头像）
    {
      label: () => t('channel.channel_icon'),
      prop: 'channel_icon',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'avatar',
          props: {
            shape: 'circle',
          },
        },
      },
    },
    
    // 5. 带 Switch 交互的列
    {
      label: () => t('channel.support_collection'),
      prop: 'support_collection',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'support_collection',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                save(row.id, { ...row, support_collection: value }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  } else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    
    // 6. 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('channel:channel:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:channel:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.delSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
```

---

### 1.5 GetFormItems.tsx（表单项定义）的结构

#### 标准实现：

```tsx
import type { MaFormItem } from '@mineadmin/form'
import type { ChannelVo } from '~/channel/api/Channel.ts'
import MaKeyValue from '@/components/ma-key-value/index.vue'

export default function getFormItems(
  formType: 'add' | 'edit' = 'add',
  t: any,
  model: ChannelVo
): MaFormItem[] {
  // 新增时的默认值
  if (formType === 'add') {
    model.status = true
    model.support_collection = false
    model.support_disbursement = false
    model.config = []
    model.country_code = 'IND'
    model.currency = 'INR'
  }

  // 编辑时的处理
  if (formType === 'edit') {
    // todo...
  }

  return [
    // 基础字段
    {
      label: t('channel.channel_code'),
      prop: 'channel_code',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    
    // 选择框
    {
      label: t('channel.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    
    // 图片上传
    {
      label: t('channel.channel_icon'),
      prop: 'channel_icon',
      cols: { md: 12, xs: 24 },
      render: () => <ma-upload-image />,
    },
    
    // 复杂组件
    {
      label: t('channel.config'),
      prop: 'config',
      render: () => MaKeyValue,
    },
    
    // 支持响应式字段和条件渲染
    {
      label: t('tenant.user_num_limit'),
      prop: 'user_num_limit',
      render: ({ formData }) => {
        const showHint = formData.user_num_limit === -1
        return (
          <div class="w-full">
            <el-input-number class="w-full" v-model={formData.user_num_limit} min={-1} />
            {showHint && (
              <div style="color: #999; font-size: 12px; margin-top: 5px;">
                {t("tenant.limitHint")}
              </div>
            )}
          </div>
        )
      },
      itemProps: {
        required: true,
        rules: [{ type: "number", min: -1 }],
      },
    },
  ]
}
```

---

### 1.6 GetSearchItems.tsx（搜索表单定义）的结构

#### 标准实现：

```tsx
import type { MaSearchItem } from '@mineadmin/search'
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    // 普通输入框
    {
      label: () => t('channel.channel_code'),
      prop: 'channel_code',
      render: () => <el-input />,
    },
    
    // 远程搜索下拉框
    {
      label: () => t('channel.support_collection'),
      prop: 'support_collection',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve => 
          resolve(selectStatus('channel', 'support_collection_list'))
        ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value }
          })
        },
      },
    },
  ]
}
```

---

## 二、代码风格

### 2.1 TypeScript 编码规范

#### 类型定义原则：

```typescript
// ✓ 正确：在 API 文件中定义和导出 VO 类型
export interface ChannelVo {
  id: number
  channel_code: string
  channel_name: string
  status: boolean
  created_at: string
  updated_at: string
}

// ✓ 正确：在组件中使用导入的类型
const formModel = ref<ChannelVo>({})

// ✗ 错误：使用 any 类型
const formModel = ref<any>({})  // 避免

// ✓ 正确：函数类型标注
function handleDelete(ids: number[]): Promise<void> {
  // ...
}
```

#### API 文件的标准模式：

```typescript
import type { ResponseStruct } from "#/global"

// 1. 定义 VO 类型
export interface ChannelVo {
  id: number
  channel_code: string
  // ... 其他字段
}

// 2. 定义 API 函数
export function page(params: ChannelVo): Promise<ResponseStruct<ChannelVo[]>> {
  return useHttp().get("/admin/channel/channel/list", { params })
}

export function create(data: ChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/channel/channel", data)
}

export function save(id: number, data: ChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel/${id}`, data)
}

export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel", { data: ids })
}

export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel/real_delete", { data: ids })
}

export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/channel/channel/recovery", { ids })
}
```

### 2.2 变量和函数命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 常量 | UPPER_SNAKE_CASE | `const DEFAULT_PAGE_SIZE = 20` |
| 变量 | camelCase | `const formModel = ref()` |
| 函数 | camelCase | `function handleDelete()` |
| 类/接口 | PascalCase | `interface ChannelVo` |
| 枚举 | PascalCase | `enum ResultCode` |
| 布尔变量 | is/has 前缀 | `const isRecovery = ref(false)` |
| 引用变量 | Ref 后缀 | `const formRef = ref()` |
| 对话框/抽屉 | Dialog/Drawer 后缀 | `const maDialog: UseDialogExpose` |

---

### 2.3 导入顺序规范

遵循以下顺序组织导入语句：

```typescript
// 1. 类型导入（按字母顺序）
import type { MaFormExpose } from '@mineadmin/form'
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

// 2. API 导入
import { create, save } from '~/channel/api/Channel.ts'

// 3. Hooks 导入
import useDialog from '@/hooks/useDialog.ts'
import useForm from '@/hooks/useForm.ts'
import { useMessage } from '@/hooks/useMessage.ts'

// 4. 工具导入
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

// 5. 组件导入
import Form from './Form.vue'
import MaRecycle from '@/components/ma-recycle/index.vue'
```

---

### 2.4 注释规范

#### 文件头注释（所有源文件都包含）：

```typescript
/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
```

或者 Vue 注释格式：

```vue
<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
```

#### 关键业务逻辑注释：

```typescript
// ✓ 良好的注释
function handleDelete() {
  // 收集所有选中项的 ID
  const ids = selections.value.map((item: any) => item.id)
  
  // 根据当前状态判断是否在回收站
  if (isRecovery.value) {
    // 真删除（永久删除）
    msg.delConfirm(t('crud.realDeleteDataMessage')).then(async () => {
      const response = await realDelete(ids)
      // ...
    })
  } else {
    // 软删除（移到回收站）
    msg.delConfirm(t('crud.delMessage')).then(async () => {
      const response = await deleteByIds(ids)
      // ...
    })
  }
}

// ✗ 避免过度注释
const id = row.id  // 获取 ID
```

---

### 2.5 代码格式化规则

项目使用以下工具配置：

**EditorConfig (.editorconfig)：**
- 字符编码：UTF-8
- 缩进风格：Space（空格）
- 缩进大小：2
- 行末字符：LF
- 文件末尾插入换行符：是
- 去除行末空格：是

**ESLint (eslint.config.js)：**
- 基于 @antfu/eslint-config
- Vue 3 + TypeScript 支持
- UnoCSS 支持
- 自定义规则：
  - `curly: ['error', 'all']` - 所有块都必须有大括号
  - `vue/block-order` - Vue 块顺序：route, i18n, script, template, style

**执行格式化：**
```bash
# 运行所有 linter
npm run lint

# 仅 TypeScript 检查
npm run lint:tsc

# ESLint 并自动修复
npm run lint:eslint

# Stylelint 并自动修复
npm run lint:stylelint
```

---

## 三、样式规范

### 3.1 SCSS 使用原则

#### 组件样式结构：

```vue
<script setup lang="ts">
// 脚本内容
</script>

<template>
  <div class="component-wrapper">
    <!-- 模板内容 -->
  </div>
</template>

<style scoped lang="scss">
// 样式内容
</style>
```

#### SCSS 编写规范：

```scss
// ✓ 正确：使用 scoped 样式防止污染
<style scoped lang="scss">
.component-wrapper {
  display: flex;
  flex-direction: column;

  .header {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>

// ✗ 避免：全局样式污染
<style lang="scss">
.btn {
  padding: 8px;  // 会影响所有 .btn
}
</style>
```

### 3.2 Class 命名规范

使用 BEM（Block-Element-Modifier）或简化版本：

```scss
// BEM 风格
.block {           // 块
  &__element {     // 元素
    &--modifier {  // 修饰符
      color: red;
    }
  }
}

// 或简化风格（项目多用这种）
.component-name {
  .sub-element {
    color: blue;
  }

  &.active {
    color: red;
  }
}
```

### 3.3 UnoCSS 实用类使用

项目使用 UnoCSS 提供的实用类，减少自定义样式：

```vue
<!-- 不需要写 CSS，直接使用 UnoCSS 类 -->
<div class="flex flex-col gap-4">
  <div class="p-4 bg-gray-100 rounded">内容</div>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    按钮
  </button>
</div>

<!-- 响应式设计 -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/2">侧边栏</div>
  <div class="w-full md:w-1/2">主内容</div>
</div>
```

### 3.4 常见 UnoCSS 类速查

| 功能 | 类 |
|------|-----|
| 布局 | `flex`, `flex-col`, `grid`, `block`, `inline-block` |
| 间距 | `p-4`, `m-4`, `gap-4`, `px-4`, `py-2` |
| 大小 | `w-full`, `h-screen`, `w-1/2`, `w-1/3` |
| 颜色 | `bg-red-500`, `text-blue-600`, `border-gray-200` |
| 圆角 | `rounded`, `rounded-lg`, `rounded-full` |
| 阴影 | `shadow`, `shadow-lg`, `shadow-md` |
| 鼠标 | `cursor-pointer`, `hover:bg-blue-600` |
| 文本 | `text-center`, `text-sm`, `font-bold`, `truncated` |

---

## 四、API 调用模式

### 4.1 API 文件组织（/api 目录）

```typescript
// 文件：src/modules/channel/api/Channel.ts

import type { ResponseStruct } from "#/global"

// 1. 定义所有相关的 VO 接口
export interface ChannelVo {
  id: number
  channel_code: string
  channel_name: string
  // ...
}

export interface ChannelDictVo {
  id: string
  channel_code: string
  // 用于远程选择的最小化版本
}

// 2. 页面列表查询
export function page(params: ChannelVo): Promise<ResponseStruct<ChannelVo[]>> {
  return useHttp().get("/admin/channel/channel/list", { params })
}

// 3. 远程搜索（用于下拉框）
export function remote(params?: {
  channel_type?: number
  support_collection?: number
}): Promise<ResponseStruct<ChannelDictVo[]>> {
  return useHttp().get("/admin/channel/channel_dict/remote", { params })
}

// 4. 创建
export function create(data: ChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/channel/channel", data)
}

// 5. 编辑
export function save(id: number, data: ChannelVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/channel/channel/${id}`, data)
}

// 6. 软删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel", { data: ids })
}

// 7. 真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/channel/channel/real_delete", { data: ids })
}

// 8. 恢复
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/admin/channel/channel/recovery", { ids })
}
```

### 4.2 API 调用的异常处理模式

```typescript
// 在 Index.vue 中的标准错误处理

const maDialog: UseDialogExpose = useDialog({
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      elForm.validate().then(() => {
        switch (formType) {
          case 'add':
            formRef.value.add().then((res: any) => {
              // ✓ 检查 ResultCode
              res.code === ResultCode.SUCCESS 
                ? msg.success(t('crud.createSuccess')) 
                : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              // ✓ 处理 HTTP 错误
              msg.alertError(err.response?.data?.message)
            }).finally(() => {
              okLoadingState(false)
            })
            break
        }
      }).catch()
    }
    okLoadingState(false)
  },
})
```

### 4.3 ResultCode 枚举值

```typescript
export enum ResultCode {
  SUCCESS = 200,        // 成功
  FAIL = 500,           // 失败
  UNAUTHORIZED = 401,   // 未授权
  FORBIDDEN = 403,      // 禁止访问
  NOT_FOUND = 404,      // 不存在
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  UNPROCESSABLE_ENTITY = 422,
  DISABLED = 423,
  SYS_Error = 100500,   // 系统错误
}

// 使用示例
if (response.code === ResultCode.SUCCESS) {
  msg.success('操作成功')
} else {
  msg.error(response.message)
}
```

---

## 五、国际化（i18n）模式

### 5.1 国际化文件组织

每个模块都有 `locales` 目录，包含多语言 YAML 文件：

```
src/modules/{module_name}/locales/
├── en[English].yaml
├── zh_CN[简体中文].yaml
└── zh_TW[繁體中文].yaml
```

### 5.2 YAML 文件结构

**文件：zh_CN[简体中文].yaml**

```yaml
channel:
  # 页面/模块标题
  index: 渠道管理
  
  # 字段标签
  channel_code: 渠道编码
  channel_name: 渠道名称
  channel_icon: 渠道图标
  country_code: 国家编码
  currency: 货币币种
  api_base_url: API基础URL
  
  # 其他模块字段
  support_collection: 支持收款
  support_disbursement: 支持付款
  status: 状态

# 菜单项
channelMenu:
  channel:
    list: 渠道列表
    create: 新增渠道
    update: 修改渠道
    delete: 删除渠道
    recovery: 恢复渠道
    realDelete: 清空回收站

# 枚举值
enums:
  channel:
    account_type:
      collection: 代收
      payment: 代付
```

### 5.3 在代码中使用国际化

#### 基础用法：

```typescript
// 获取翻译函数
const t = useTrans().globalTrans        // 全局翻译
const local = useTrans().localTrans     // 当前模块的本地翻译

// 在模板中使用
{{ t('channel.index') }}                // 渠道管理
{{ t('channel.channel_code') }}         // 渠道编码

// 在 TypeScript 中使用
const title = t('crud.add')             // 新增
const message = t('crud.createSuccess') // 创建成功
```

#### 在组件配置中使用：

```typescript
// GetTableColumns.tsx
return [
  { label: () => t('channel.channel_code'), prop: 'channel_code' },
  { label: () => t('channel.channel_name'), prop: 'channel_name' },
]

// GetFormItems.tsx
return [
  {
    label: t('channel.channel_code'),
    prop: 'channel_code',
    render: () => <el-input />,
  },
]

// GetSearchItems.tsx
return [
  {
    label: () => local('Member.username'),
    prop: 'username',
    render: () => <el-input clearable />,
  },
]
```

### 5.4 国际化翻译键的命名规范

- **模块级别**：`moduleName.propertyName`
  - 示例：`channel.index`, `tenant.companyName`
  
- **枚举值**：`enums.moduleName.fieldName.value`
  - 示例：`enums.channel.account_type.collection`
  
- **菜单项**：`moduleMenu.entity.action`
  - 示例：`channelMenu.channel.create`
  
- **通用 CRUD**：`crud.action`
  - 示例：`crud.search`, `crud.add`, `crud.delete`, `crud.createSuccess`

---

## 六、最佳实践总结

### 6.1 组件设计最佳实践

#### ✓ 应该做：

1. **单一职责原则**
   ```typescript
   // ✓ 好：每个组件单一职责
   // Index.vue - 仅处理列表展示和管理
   // Form.vue - 仅处理表单创建/编辑
   // GetTableColumns.tsx - 仅定义表格列
   ```

2. **类型安全**
   ```typescript
   // ✓ 好：使用完整的类型定义
   const formModel = ref<ChannelVo>({})
   const page = ref<number>(1)
   const loading = ref<boolean>(false)
   ```

3. **解耦 API 和 UI 逻辑**
   ```typescript
   // ✓ 好：API 逻辑与 UI 分离
   // api/Channel.ts - 仅处理 API 调用
   // views/Channel/index.vue - 处理 UI 逻辑
   ```

4. **可复用的配置函数**
   ```typescript
   // ✓ 好：表格/表单配置作为独立函数
   const columns = getTableColumns(dialog, formRef, t)
   const items = getFormItems(formType, t, model)
   ```

#### ✗ 避免：

1. **过度渲染**
   ```typescript
   // ✗ 差：在列表中做复杂逻辑
   tableColumns: getTableColumns().map(col => {
     // 复杂计算和 API 调用
     return col
   })
   ```

2. **魔法数字**
   ```typescript
   // ✗ 差
   if (status === 1) { }  // 1 代表什么？
   
   // ✓ 好
   enum Status { ENABLED = 1, DISABLED = 0 }
   if (status === Status.ENABLED) { }
   ```

3. **深层 Props 穿透**
   ```typescript
   // ✗ 差：通过多层 Props 传递数据
   <ChildComponent :data="data" :callback="callback" />
   
   // ✓ 好：使用 Provide/Inject 或组合式 API
   const { data, callback } = inject('key')
   ```

---

### 6.2 数据流管理最佳实践

```typescript
// ✓ 标准的数据流：

// 1. 获取列表
const { data: list } = await page(params)

// 2. 打开创建对话框
dialog.open({ formType: 'add' })

// 3. 用户输入表单数据
formModel.value = { ... }

// 4. 表单验证并提交
const result = await create(formModel.value)

// 5. 检查结果
if (result.code === ResultCode.SUCCESS) {
  msg.success(t('crud.createSuccess'))
  dialog.close()
  proTableRef.value.refresh()
}

// 6. 处理错误
else {
  msg.error(result.message)
}
```

### 6.3 权限控制最佳实践

```typescript
// API 文件中定义权限相关函数
import hasAuth from '@/utils/permission/hasAuth.ts'

// 在表格列中使用权限检查
const showBtn = (auth: string | string[], row: ChannelVo) => {
  return hasAuth(auth)
}

// 在模板中使用
{
  name: 'edit',
  show: ({ row }) => showBtn('channel:channel:update', row),
  // ...
}

// 或在模板中直接使用 v-auth 指令
<el-button v-auth="['channel:channel:save']" type="primary">
  {{ t('crud.add') }}
</el-button>
```

### 6.4 性能优化建议

1. **使用 refs 引用减少重新渲染**
   ```typescript
   const selections = ref<any[]>([])
   const { onSelectionChange: (selection: any[]) => selections.value = selection }
   ```

2. **避免在列表中做复杂计算**
   ```typescript
   // ✗ 在每个单元格都计算
   cellRender: () => complexCalculation()
   
   // ✓ 提前计算并存储
   const computedData = computed(() => {
     return list.value.map(item => ({
       ...item,
       calculated: complexCalculation(item)
     }))
   })
   ```

3. **合理使用对话框懒加载**
   ```typescript
   const maDialog = useDialog({
     beforeOpen: () => {
       // 在对话框打开前加载数据
     }
   })
   ```

---

## 七、常见问题和解决方案

### Q1: 如何添加新的国际化词条？

**A:** 在 `/src/modules/{module}/locales/` 文件中添加：

```yaml
# zh_CN[简体中文].yaml
myFeature:
  title: 我的功能
  description: 功能描述
  
# en[English].yaml
myFeature:
  title: My Feature
  description: Feature Description
```

### Q2: 表格列中如何实现复杂的格式化？

**A:** 使用 `cellRender` 或 `cellRenderTo` 与自定义渲染函数：

```tsx
{
  label: () => t('field.name'),
  prop: 'data',
  cellRender: ({ row }) => {
    return <el-tag>{row.data}</el-tag>
  }
}
```

### Q3: 如何在表单中实现联动或条件渲染？

**A:** 在 `render` 函数中访问 `formData`：

```tsx
{
  label: () => t('field.dependent'),
  prop: 'dependent',
  render: ({ formData }) => {
    const show = formData.parent === 'value1'
    return show ? <el-input /> : null
  }
}
```

### Q4: 如何添加表单验证规则？

**A:** 在 `itemProps.rules` 中定义：

```tsx
{
  label: () => t('field.name'),
  prop: 'name',
  itemProps: {
    required: true,
    rules: [
      { required: true, message: t('error.required'), trigger: 'blur' },
      { min: 3, max: 20, message: t('error.length'), trigger: 'blur' },
      { pattern: /^[a-z]+$/, message: t('error.pattern'), trigger: 'blur' }
    ]
  }
}
```

---

## 八、路径别名速查表

| 别名 | 实际路径 | 用途 |
|------|---------|------|
| `@/` | `src/` | 源代码根路径 |
| `#/` | `types/` | 类型定义 |
| `$/` | `src/plugins/` | 插件目录 |
| `~/` | `src/modules/` | 业务模块 |

**使用示例：**
```typescript
import { page } from '~/channel/api/Channel.ts'      // 导入其他模块 API
import { useMessage } from '@/hooks/useMessage.ts'   // 导入工具 hooks
import type { ResponseStruct } from '#/global'        // 导入类型
```

---

## 九、项目依赖关键包说明

| 包名 | 用途 | 版本 |
|------|------|------|
| `@mineadmin/pro-table` | 高级表格组件 | ^1.0.73 |
| `@mineadmin/form` | 表单组件 | ^1.0.51 |
| `@mineadmin/search` | 搜索表单组件 | ^1.0.53 |
| `element-plus` | UI 组件库 | ^2.10.2 |
| `vue-i18n` | 国际化 | 11.1.2 |
| `pinia` | 状态管理 | ^3.0.3 |
| `vue-router` | 路由 | ^4.5.1 |
| `lodash-es` | 工具库 | ^4.17.21 |
| `dayjs` | 日期处理 | ^1.11.13 |
| `tinymce` | 富文本编辑器 | ^7.9.1 |

---

## 总结

这份代码规范确保了项目的：

1. **一致性**：所有模块遵循相同的结构和模式
2. **可维护性**：清晰的职责分离和类型安全
3. **可扩展性**：模块化设计便于添加新功能
4. **国际化支持**：完整的多语言解决方案
5. **代码质量**：严格的 ESLint 和 TypeScript 检查

建议在开发新功能时严格遵循这些规范，以保持代码库的健康和一致性。

