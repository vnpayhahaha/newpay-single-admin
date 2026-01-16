# NewPay Admin 组件使用规范文档

> **版本**: 1.0.0
> **更新日期**: 2025-12-16
> **适用项目**: NewPay Admin (基于 MineAdmin 框架)

---

## 目录

1. [概述](#1-概述)
2. [MaProTable 表格组件](#2-maprotable-表格组件)
3. [MaForm 表单组件](#3-maform-表单组件)
4. [GetTableColumns.tsx 规范](#4-gettablecolumnstsx-规范)
5. [GetFormItems.tsx 规范](#5-getformitemstsx-规范)
6. [GetSearchItems.tsx 规范](#6-getsearchitemstsx-规范)
7. [样式规范](#7-样式规范)
8. [完整示例](#8-完整示例)
9. [常见问题](#9-常见问题)

---

## 1. 概述

### 1.1 模块化架构

NewPay Admin 采用模块化架构，每个业务实体遵循统一的组件结构：

```
src/modules/{module}/views/{Entity}/
├── Index.vue                    # 列表页面（使用 MaProTable）
├── Form.vue                     # 表单页面（使用 MaForm）
└── components/
    ├── GetTableColumns.tsx      # 表格列定义
    ├── GetFormItems.tsx         # 表单项定义
    └── GetSearchItems.tsx       # 搜索项定义
```

### 1.2 核心组件

- **MaProTable**: 高级表格组件，支持搜索、分页、排序、导出等功能
- **MaForm**: 表单组件，支持多种输入类型、验证、布局等
- **MaSearch**: 搜索组件，配合 MaProTable 使用

### 1.3 设计原则

1. **配置驱动**: 通过配置对象定义组件行为，减少重复代码
2. **类型安全**: 使用 TypeScript 类型定义，确保类型安全
3. **国际化支持**: 所有文本使用 i18n，支持多语言
4. **权限控制**: 集成权限验证，控制按钮和操作的显示
5. **响应式布局**: 支持响应式布局，适配不同屏幕尺寸

---

## 2. MaProTable 表格组件

### 2.1 基本使用

**在 Index.vue 中使用:**

```vue
<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <!-- 自定义插槽 -->
      <template #actions>
        <el-button type="primary" @click="handleAdd">
          {{ t('crud.add') }}
        </el-button>
      </template>

      <template #toolbarLeft>
        <el-button type="danger" @click="handleDelete">
          {{ t('crud.delete') }}
        </el-button>
      </template>
    </MaProTable>
  </div>
</template>

<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import { page } from '~/channel/api/Channel.ts'
import getTableColumns from './components/GetTableColumns.tsx'
import getSearchItems from './components/GetSearchItems.tsx'

const proTableRef = ref<MaProTableExpose>()
const t = useTrans().globalTrans

// 配置参数
const options = ref<MaProTableOptions>({
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('channel.index'),
  },
  tableOptions: {
    on: {
      onSelectionChange: (selection: any[]) => {
        // 处理选择变化
      },
    },
  },
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t('crud.search'),
      resetBtn: () => t('crud.reset'),
    },
  },
  requestOptions: {
    api: page,
  },
})

// 架构配置
const schema = ref<MaProTableSchema>({
  searchItems: getSearchItems(t),
  tableColumns: getTableColumns(dialog, formRef, t),
})
</script>
```

### 2.2 MaProTableOptions 配置详解

```typescript
interface MaProTableOptions {
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom?: number

  // 表头配置
  header?: {
    mainTitle?: () => string
    subTitle?: () => string
  }

  // 表格参数
  tableOptions?: {
    // 事件监听
    on?: {
      onSelectionChange?: (selection: any[]) => void
      onRowClick?: (row: any) => void
      // ... 其他事件
    }
  }

  // 搜索参数
  searchOptions?: {
    fold?: boolean  // 是否折叠搜索表单
    text?: {
      searchBtn?: () => string
      resetBtn?: () => string
      isFoldBtn?: () => string
      notFoldBtn?: () => string
    }
  }

  // 搜索表单参数
  searchFormOptions?: {
    labelWidth?: string
  }

  // 请求配置
  requestOptions?: {
    api: (params: any) => Promise<any>  // API 方法
    beforeRequest?: (params: any) => any  // 请求前处理
    afterRequest?: (data: any) => any  // 请求后处理
  }
}
```

### 2.3 常用插槽

| 插槽名 | 说明 | 使用场景 |
|-------|------|---------|
| `actions` | 表格顶部右侧操作区 | 新增、导入等按钮 |
| `toolbarLeft` | 工具栏左侧 | 批量删除、批量导出等 |
| `toolbarRight` | 工具栏右侧 | 刷新、列设置等 |
| `empty` | 空数据提示 | 自定义空数据展示 |

### 2.4 表格方法

```typescript
// 获取表格实例
const proTableRef = ref<MaProTableExpose>()

// 刷新表格
proTableRef.value.refresh()

// 获取选中行
const selections = proTableRef.value.getSelections()

// 清空选中
proTableRef.value.clearSelection()
```

---

## 3. MaForm 表单组件

### 3.1 基本使用

**在 Form.vue 中使用:**

```vue
<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<script setup lang="ts">
import type { MaFormExpose } from '@mineadmin/form'
import type { ChannelVo } from '~/channel/api/Channel.ts'
import { create, save } from '~/channel/api/Channel.ts'
import getFormItems from './components/GetFormItems.tsx'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const { formType = 'add', data = null } = defineProps<{
  formType: 'add' | 'edit'
  data?: ChannelVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<ChannelVo>({})

// 初始化表单
useForm('maFormRef').then((form: MaFormExpose) => {
  // 编辑模式：填充数据
  if (formType === 'edit' && data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
  }

  // 设置表单项
  form.setItems(getFormItems(formType, t, formModel.value))

  // 设置表单选项
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

// 暴露方法给父组件
defineExpose({
  add,
  edit,
  maForm: maFormRef,
})
</script>
```

### 3.2 表单验证

**在 Index.vue 中调用表单方法:**

```typescript
const maDialog: UseDialogExpose = useDialog({
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)

    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()

      // 验证表单
      elForm.validate().then(() => {
        switch (formType) {
          case 'add':
            formRef.value.add().then((res: any) => {
              if (res.code === ResultCode.SUCCESS) {
                msg.success(t('crud.createSuccess'))
                maDialog.close()
                proTableRef.value.refresh()
              } else {
                msg.error(res.message)
              }
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            }).finally(() => {
              okLoadingState(false)
            })
            break

          case 'edit':
            formRef.value.edit().then((res: any) => {
              if (res.code === 200) {
                msg.success(t('crud.updateSuccess'))
                maDialog.close()
                proTableRef.value.refresh()
              } else {
                msg.error(res.message)
              }
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            }).finally(() => {
              okLoadingState(false)
            })
            break
        }
      }).catch(() => {
        okLoadingState(false)
      })
    }
  },
})
```

### 3.3 表单方法

```typescript
const maFormRef = ref<MaFormExpose>()

// 获取 Element Plus 表单实例
const elFormRef = maFormRef.value.getElFormRef()

// 验证表单
elFormRef.validate().then(() => {
  // 验证成功
}).catch(() => {
  // 验证失败
})

// 重置表单
elFormRef.resetFields()

// 清空验证
elFormRef.clearValidate()
```

---

## 4. GetTableColumns.tsx 规范

### 4.1 文件结构

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
  const msg = useMessage()

  // 权限检查函数
  const showBtn = (auth: string | string[], row: ChannelVo) => {
    return hasAuth(auth)
  }

  return [
    // 列定义...
  ]
}
```

### 4.2 列类型详解

#### 4.2.1 多选列

```typescript
{
  type: 'selection',
  showOverflowTooltip: false,
  label: () => t('crud.selection')
}
```

#### 4.2.2 索引序号列

```typescript
{
  type: 'index'
}
```

#### 4.2.3 展开列

```typescript
{
  label: () => t('transaction_record.failed_msg'),
  prop: 'failed_msg',
  width: 80,
  type: 'expand',
  cellRender: ({ row }) => {
    return <el-tag>{row.failed_msg}</el-tag>
  },
}
```

#### 4.2.4 普通列

```typescript
{
  label: () => t('channel.channel_code'),
  prop: 'channel_code',
  width: 100,  // 可选
  minWidth: 120,  // 可选
}
```

#### 4.2.5 自定义渲染列

**方式一：使用 cellRender**

```typescript
{
  label: () => t('tenant.companyName'),
  prop: 'company_name',
  minWidth: '180px',
  cellRender: ({ row }) => {
    return (
      <div class="text-align-left">
        <p>
          <el-text type="primary" truncated>
            {row.company_name}
          </el-text>
        </p>
        <p>
          <el-text class="mx-1" type="success">
            {row.contact_user_name}
          </el-text>
        </p>
        <p>
          <el-text class="mx-1" type="info">
            {row.contact_phone}
          </el-text>
        </p>
      </div>
    )
  },
}
```

**方式二：使用 cellRenderTo（增强渲染器）**

```typescript
// 头像列
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
}

// 开关列
{
  label: () => t('channel.status'),
  prop: 'status',
  width: 80,
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'switch',
      prop: 'status',
      props: {
        size: 'small',
        activeValue: true,
        inactiveValue: false,
        on: {
          change: (value: boolean, row: any, proxy: MaProTableExpose) => {
            save(row.id, { ...row, status: value }).then((res) => {
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
}

// 标签列（字典）
{
  label: () => t('channel.status'),
  prop: 'status',
  width: 80,
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'tag',
      api: () => new Promise((resolve) =>
        resolve(selectStatus('channel', 'status_list'))
      ),
      dataHandle: (response: any) => {
        return response.data?.map((item: Common.StatusOptionItem) => {
          return { label: `${item.label}`, value: item.value }
        })
      },
      props: {
        effect: 'dark',
      },
    },
  },
}

// 用户名列
{
  label: () => t('tenant.createdBy'),
  width: '180px',
  prop: 'created_by',
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'user-name',
      dictName: 'userDict',
    },
  },
}
```

#### 4.2.6 操作列

```typescript
{
  type: 'operation',
  label: () => t('crud.operation'),
  width: '260px',
  fixed: 'right',  // 可选：固定列
  operationConfigure: {
    type: 'tile',  // 或 'dropdown'
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
}
```

### 4.3 cellRenderTo 支持的类型

| 类型 | 说明 | 配置示例 |
|------|------|---------|
| `avatar` | 头像显示 | `{ type: 'avatar', props: { shape: 'circle' } }` |
| `switch` | 开关 | `{ type: 'switch', prop: 'status', props: { size: 'small' } }` |
| `tag` | 标签（字典） | `{ type: 'tag', api: ..., dataHandle: ... }` |
| `user-name` | 用户名 | `{ type: 'user-name', dictName: 'userDict' }` |

### 4.4 最佳实践

1. **权限控制**: 使用 `hasAuth()` 检查权限
2. **国际化**: 所有文本使用 `t()` 函数
3. **类型安全**: 使用 TypeScript 类型定义
4. **错误处理**: 操作后检查 `ResultCode` 并提示用户
5. **刷新表格**: 操作成功后调用 `proxy.refresh()`

---

## 5. GetFormItems.tsx 规范

### 5.1 文件结构

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
import type { MaFormItem } from '@mineadmin/form'
import type { ChannelVo } from '~/channel/api/Channel.ts'
import MaKeyValue from '@/components/ma-key-value/index.vue'

export default function getFormItems(
  formType: 'add' | 'edit' = 'add',
  t: any,
  model: ChannelVo
): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.status = true
    model.support_collection = false
    model.config = []
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    // 表单项定义...
  ]
}
```

### 5.2 表单项类型详解

#### 5.2.1 基础输入框

```typescript
{
  label: t('channel.channel_code'),
  prop: 'channel_code',
  cols: { md: 12, xs: 24 },  // 响应式布局
  itemProps: { required: true },  // 表单项属性
  render: () => <el-input />,
}
```

#### 5.2.2 文本域

```typescript
{
  label: t('channel.doc_url'),
  prop: 'doc_url',
  render: () => <el-input type="textarea" />,
}

// 带字数限制
{
  label: () => t('Member.signed'),
  prop: 'signed',
  render: () => (
    <el-input
      v-model={model.signed}
      type="textarea"
      rows={3}
      placeholder={t('Member.placeholder.signed')}
      maxlength={200}
      show-word-limit
    />
  ),
}
```

#### 5.2.3 密码输入框

```typescript
{
  label: () => t('Member.password'),
  prop: 'password',
  render: () => (
    <el-input
      v-model={model.password}
      type="password"
      placeholder={t('Member.placeholder.password')}
      clearable
      show-password
    />
  ),
  itemProps: {
    rules: [
      { required: true, message: t('Member.rules.password_required'), trigger: 'blur' },
      { min: 6, max: 32, message: t('Member.rules.password_length'), trigger: 'blur' },
    ],
  },
}
```

#### 5.2.4 数字输入框

```typescript
{
  label: t('tenant.safeLevel'),
  prop: 'safe_level',
  render: () => <el-input-number min={0} />,
  itemProps: {
    required: true,
  },
  cols: {
    span: 12,
  },
  renderProps: {
    class: 'w-full',
    max: 99,
  },
}

// 带提示的数字输入框
{
  label: t('tenant.user_num_limit'),
  prop: 'user_num_limit',
  render: ({ formData }) => {
    const showHint = formData.user_num_limit === -1
    return (
      <div class="w-full">
        <el-input-number
          class="w-full"
          v-model={formData.user_num_limit}
          min={-1}
        />
        {showHint && (
          <div style="color: #999; font-size: 12px; margin-top: 5px;">
            {t('tenant.limitHint')}
          </div>
        )}
      </div>
    )
  },
  itemProps: {
    required: true,
    rules: [
      {
        type: 'number',
        min: -1,
      },
    ],
  },
  cols: {
    span: 12,
  },
}
```

#### 5.2.5 开关

```typescript
{
  label: t('channel.status'),
  prop: 'status',
  cols: { md: 12, xs: 24 },
  render: () => <el-switch />,
}
```

#### 5.2.6 单选框组

```typescript
{
  label: () => t('Member.status'),
  prop: 'status',
  render: () => (
    <el-radio-group v-model={model.status}>
      <el-radio value="1">{t('Member.status_options.normal')}</el-radio>
      <el-radio value="0">{t('Member.status_options.disabled')}</el-radio>
    </el-radio-group>
  ),
  itemProps: {
    rules: [
      { required: true, message: t('Member.rules.status_required'), trigger: 'change' },
    ],
  },
}
```

#### 5.2.7 图片上传

```typescript
{
  label: t('channel.channel_icon'),
  prop: 'channel_icon',
  cols: { md: 12, xs: 24 },
  render: () => <ma-upload-image />,
}

// 带配置的图片上传
{
  label: () => t('Member.avatar'),
  prop: 'avatar',
  render: () => (
    <ma-upload-image
      v-model={model.avatar}
      uploadOptions={{
        action: '/admin/file/upload/image',
      }}
    />
  ),
}
```

#### 5.2.8 自定义组件

```typescript
{
  label: t('channel.config'),
  prop: 'config',
  render: () => MaKeyValue,
}
```

### 5.3 表单项配置详解

#### 5.3.1 MaFormItem 接口

```typescript
interface MaFormItem {
  label: string | (() => string)  // 标签
  prop: string  // 字段名
  render: () => JSX.Element | Component  // 渲染函数或组件
  cols?: {  // 响应式布局
    span?: number  // 占据列数 (24栅格系统)
    md?: number  // 中等屏幕
    xs?: number  // 小屏幕
    sm?: number  // 小屏幕+
    lg?: number  // 大屏幕
    xl?: number  // 超大屏幕
  }
  itemProps?: {  // 表单项属性
    required?: boolean  // 是否必填
    rules?: Array<{  // 验证规则
      required?: boolean
      message?: string
      trigger?: 'blur' | 'change'
      min?: number
      max?: number
      pattern?: RegExp
      type?: 'string' | 'number' | 'email' | 'url'
      validator?: (rule: any, value: any, callback: any) => void
    }>
  }
  renderProps?: {  // 渲染属性
    class?: string
    style?: any
    [key: string]: any
  }
}
```

#### 5.3.2 响应式布局

```typescript
// 使用 cols 配置响应式布局
{
  label: t('channel.channel_code'),
  prop: 'channel_code',
  cols: {
    md: 12,  // 中等屏幕占 12 列
    xs: 24   // 小屏幕占 24 列（全宽）
  },
  render: () => <el-input />,
}

// 使用 span
{
  label: t('tenant.companyName'),
  prop: 'company_name',
  cols: {
    span: 12,  // 占 12 列
  },
  render: () => <el-input />,
}
```

#### 5.3.3 验证规则

```typescript
// 基础验证
{
  itemProps: {
    required: true,  // 必填
  },
}

// 自定义验证规则
{
  itemProps: {
    rules: [
      {
        required: true,
        message: t('Member.rules.username_required'),
        trigger: 'blur'
      },
      {
        min: 3,
        max: 30,
        message: t('Member.rules.username_length'),
        trigger: 'blur'
      },
    ],
  },
}

// 正则验证
{
  itemProps: {
    rules: [
      {
        pattern: /^\d{4,6}$/,
        message: t('Member.rules.pin_pattern'),
        trigger: 'blur'
      },
    ],
  },
}

// 类型验证
{
  itemProps: {
    rules: [
      {
        type: 'email',
        message: t('Member.rules.email_pattern'),
        trigger: 'blur'
      },
    ],
  },
}

// 条件验证（根据表单类型）
{
  itemProps: {
    rules: formType === 'add'
      ? [
          { required: true, message: t('Member.rules.password_required'), trigger: 'blur' },
          { min: 6, max: 32, message: t('Member.rules.password_length'), trigger: 'blur' },
        ]
      : [],
  },
}
```

### 5.4 最佳实践

1. **默认值设置**: 在 `formType === 'add'` 中设置默认值
2. **验证规则**: 使用 `itemProps.rules` 定义验证规则
3. **响应式布局**: 使用 `cols` 配置不同屏幕的布局
4. **国际化**: 所有文本、占位符、错误提示使用 `t()` 函数
5. **v-model 绑定**: 使用 `v-model={model.prop}` 双向绑定

---

## 6. GetSearchItems.tsx 规范

### 6.1 文件结构

```typescript
/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from '@mineadmin/search'
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    // 搜索项定义...
  ]
}
```

### 6.2 搜索项类型详解

#### 6.2.1 输入框搜索

```typescript
{
  label: () => t('channel.channel_code'),
  prop: 'channel_code',
  render: () => <el-input />,
}
```

#### 6.2.2 远程选择器搜索

```typescript
{
  label: () => t('channel.status'),
  prop: 'status',
  render: () => <ma-remote-select filterable />,
  renderProps: {
    api: () => new Promise(resolve =>
      resolve(selectStatus('channel', 'status_list'))
    ),
    dataHandle: (response: any) => {
      return response.data?.map((item: Common.StatusOptionItem) => {
        return { label: `${item.label}`, value: item.value }
      })
    },
  },
}
```

#### 6.2.3 日期范围搜索

```typescript
{
  label: () => t('common.dateRange'),
  prop: 'date_range',
  render: () => (
    <el-date-picker
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  ),
}
```

### 6.3 MaSearchItem 接口

```typescript
interface MaSearchItem {
  label: () => string  // 标签
  prop: string  // 字段名
  render: () => JSX.Element  // 渲染函数
  renderProps?: {  // 渲染属性
    api?: () => Promise<any>  // API 方法
    dataHandle?: (response: any) => any[]  // 数据处理
    [key: string]: any
  }
}
```

### 6.4 最佳实践

1. **label 使用函数**: `label: () => t('...')` 而不是 `label: t('...')`
2. **远程数据**: 使用 `ma-remote-select` 组件
3. **数据转换**: 使用 `dataHandle` 转换 API 返回的数据
4. **可过滤**: 添加 `filterable` 属性支持搜索

---

## 7. 样式规范

### 7.1 样式组织

1. **Scoped 样式**: 使用 `<style scoped lang="scss">` 限定样式作用域
2. **UnoCSS 工具类**: 优先使用 UnoCSS 工具类
3. **自定义 SCSS**: 复杂样式使用 SCSS

### 7.2 Class 命名规范

- **BEM 命名法**: `block__element--modifier`
- **语义化**: 使用有意义的类名
- **前缀**: 自定义组件使用 `ma-` 前缀

### 7.3 UnoCSS 常用工具类

```html
<!-- 布局 -->
<div class="flex items-center justify-between">
<div class="grid grid-cols-2 gap-4">

<!-- 间距 -->
<div class="p-4 m-2 pt-3 pb-5">
<div class="mx-auto my-4">

<!-- 文本 -->
<div class="text-center text-primary text-sm">
<div class="font-bold truncated">

<!-- 宽高 -->
<div class="w-full h-screen">
<div class="min-w-120 max-h-80">
```

### 7.4 响应式设计

```html
<!-- 响应式显示/隐藏 -->
<div class="hidden md:block">  <!-- 中等屏幕及以上显示 -->
<div class="block md:hidden">  <!-- 小屏幕显示 -->

<!-- 响应式布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 8. 完整示例

### 8.1 Channel 模块示例

**目录结构:**

```
src/modules/channel/views/Channel/
├── Index.vue
├── Form.vue
└── components/
    ├── GetTableColumns.tsx
    ├── GetFormItems.tsx
    └── GetSearchItems.tsx
```

**Index.vue:**

```vue
<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import { deleteByIds, page } from '~/channel/api/Channel.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import Form from './Form.vue'

defineOptions({ name: 'channel:channel' })

const proTableRef = ref<MaProTableExpose>()
const formRef = ref()
const selections = ref<any[]>([])
const t = useTrans().globalTrans
const msg = useMessage()

// 弹窗配置
const maDialog: UseDialogExpose = useDialog({
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      elForm.validate().then(() => {
        switch (formType) {
          case 'add':
            formRef.value.add().then((res: any) => {
              res.code === ResultCode.SUCCESS
                ? msg.success(t('crud.createSuccess'))
                : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).finally(() => okLoadingState(false))
            break
          case 'edit':
            formRef.value.edit().then((res: any) => {
              res.code === 200
                ? msg.success(t('crud.updateSuccess'))
                : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).finally(() => okLoadingState(false))
            break
        }
      }).catch(() => okLoadingState(false))
    }
  },
})

// 参数配置
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
  requestOptions: {
    api: page,
  },
})

// 架构配置
const schema = ref<MaProTableSchema>({
  searchItems: getSearchItems(t),
  tableColumns: getTableColumns(maDialog, formRef, t),
})

// 批量删除
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
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
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

      <template #toolbarLeft>
        <el-button
          v-auth="['channel:channel:delete']"
          type="danger"
          plain
          :disabled="selections.length < 1"
          @click="handleDelete"
        >
          {{ t('crud.delete') }}
        </el-button>
      </template>
    </MaProTable>

    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <Form ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>
```

**Form.vue:**

```vue
<script setup lang="ts">
import type { ChannelVo } from '~/channel/api/Channel.ts'
import { create, save } from '~/channel/api/Channel.ts'
import getFormItems from './components/GetFormItems.tsx'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const { formType = 'add', data = null } = defineProps<{
  formType: 'add' | 'edit'
  data?: ChannelVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<ChannelVo>({})

useForm('maFormRef').then((form: MaFormExpose) => {
  if (formType === 'edit' && data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
  }
  form.setItems(getFormItems(formType, t, formModel.value))
  form.setOptions({ labelWidth: '150px' })
})

function add(): Promise<any> {
  return new Promise((resolve, reject) => {
    create(formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => reject(err))
  })
}

function edit(): Promise<any> {
  return new Promise((resolve, reject) => {
    save(formModel.value.id as number, formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => reject(err))
  })
}

defineExpose({ add, edit, maForm: maFormRef })
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>
```

**GetTableColumns.tsx:**

```typescript
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { ChannelVo } from '~/channel/api/Channel.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, save } from '~/channel/api/Channel.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ChannelVo) => {
    return hasAuth(auth)
  }

  return [
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    { type: 'index' },
    { label: () => t('channel.channel_code'), prop: 'channel_code' },
    { label: () => t('channel.channel_name'), prop: 'channel_name' },
    {
      label: () => t('channel.channel_icon'),
      prop: 'channel_icon',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'avatar',
          props: { shape: 'circle' },
        },
      },
    },
    {
      label: () => t('channel.status'),
      prop: 'status',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'status',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                save(row.id, { ...row, status: value }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                })
              },
            },
          },
        },
      },
    },
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

**GetFormItems.tsx:**

```typescript
import type { MaFormItem } from '@mineadmin/form'
import type { ChannelVo } from '~/channel/api/Channel.ts'

export default function getFormItems(
  formType: 'add' | 'edit' = 'add',
  t: any,
  model: ChannelVo
): MaFormItem[] {
  if (formType === 'add') {
    model.status = true
    model.support_collection = false
    model.support_disbursement = false
  }

  return [
    {
      label: t('channel.channel_icon'),
      prop: 'channel_icon',
      cols: { md: 12, xs: 24 },
      render: () => <ma-upload-image />,
    },
    {
      label: t('channel.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t('channel.channel_code'),
      prop: 'channel_code',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channel.channel_name'),
      prop: 'channel_name',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('channel.api_base_url'),
      prop: 'api_base_url',
      render: () => <el-input />,
    },
    {
      label: t('channel.doc_url'),
      prop: 'doc_url',
      render: () => <el-input type="textarea" />,
    },
  ]
}
```

**GetSearchItems.tsx:**

```typescript
import type { MaSearchItem } from '@mineadmin/search'
import { selectStatus } from '@/modules/Common'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('channel.channel_code'),
      prop: 'channel_code',
      render: () => <el-input />,
    },
    {
      label: () => t('channel.channel_name'),
      prop: 'channel_name',
      render: () => <el-input />,
    },
    {
      label: () => t('channel.status'),
      prop: 'status',
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise(resolve =>
          resolve(selectStatus('channel', 'status_list'))
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

## 9. 常见问题

### 9.1 表格相关

**Q: 如何实现表格列的条件显示?**

A: 使用 `show` 属性：

```typescript
{
  label: () => t('channel.status'),
  prop: 'status',
  show: ({ row }) => row.type === 'active',  // 条件显示
}
```

**Q: 如何固定表格列?**

A: 使用 `fixed` 属性：

```typescript
{
  label: () => t('channel.name'),
  prop: 'name',
  fixed: 'left',  // 或 'right'
}
```

**Q: 如何实现单元格点击复制?**

A: 使用 cellRenderTo 的 copy 类型（需要确认是否支持）或自定义 cellRender：

```typescript
{
  label: () => t('channel.code'),
  prop: 'code',
  cellRender: ({ row }) => {
    return (
      <div
        onClick={() => {
          navigator.clipboard.writeText(row.code)
          msg.success('复制成功')
        }}
        style="cursor: pointer"
      >
        {row.code}
      </div>
    )
  },
}
```

### 9.2 表单相关

**Q: 如何实现表单项的联动?**

A: 使用 render 函数访问 formData：

```typescript
{
  label: t('field2'),
  prop: 'field2',
  render: ({ formData }) => {
    // 根据 field1 的值显示不同的组件
    return formData.field1 === 'option1'
      ? <el-input />
      : <el-select />
  },
}
```

**Q: 如何实现动态验证规则?**

A: 根据条件返回不同的规则：

```typescript
{
  itemProps: {
    rules: formType === 'add'
      ? [{ required: true, message: '必填', trigger: 'blur' }]
      : [],
  },
}
```

**Q: 如何获取表单数据?**

A: 表单数据绑定在 `formModel` 上：

```typescript
const formModel = ref<ChannelVo>({})

// 获取表单数据
console.log(formModel.value)
```

### 9.3 搜索相关

**Q: 如何实现日期范围搜索?**

A: 使用 el-date-picker：

```typescript
{
  label: () => t('common.dateRange'),
  prop: 'date_range',
  render: () => (
    <el-date-picker
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  ),
}
```

**Q: 搜索参数如何传递给后端?**

A: MaProTable 会自动将搜索表单的值作为参数传递给 API 方法。

### 9.4 权限相关

**Q: 如何控制按钮显示?**

A: 使用 `v-auth` 指令或 `hasAuth` 函数：

```vue
<!-- 模板中 -->
<el-button v-auth="['channel:channel:save']">新增</el-button>

<!-- 操作列中 -->
{
  show: ({ row }) => hasAuth('channel:channel:update'),
}
```

### 9.5 样式相关

**Q: 如何自定义表格行样式?**

A: 在 tableOptions 中使用 rowClassName：

```typescript
tableOptions: {
  rowClassName: ({ row, rowIndex }) => {
    if (row.status === 'disabled') {
      return 'disabled-row'
    }
    return ''
  },
}
```

**Q: 如何自定义列宽?**

A: 使用 `width` 或 `minWidth`：

```typescript
{
  label: () => t('channel.name'),
  prop: 'name',
  width: 120,  // 固定宽度
  // 或
  minWidth: 120,  // 最小宽度
}
```

---

## 附录 A: 类型定义参考

### MaProTableColumns

```typescript
interface MaProTableColumns {
  type?: 'selection' | 'index' | 'expand' | 'operation'
  label?: string | (() => string)
  prop?: string
  width?: number | string
  minWidth?: number | string
  fixed?: 'left' | 'right'
  show?: (context: { row: any }) => boolean
  cellRender?: (context: { row: any }) => JSX.Element
  cellRenderTo?: {
    name: string
    props: any
  }
  operationConfigure?: {
    type: 'tile' | 'dropdown'
    actions: Array<{
      name: string
      icon?: string
      text: () => string
      show?: (context: { row: any }) => boolean
      onClick: (context: { row: any }, proxy: MaProTableExpose) => void
    }>
  }
}
```

### MaFormItem

```typescript
interface MaFormItem {
  label: string | (() => string)
  prop: string
  render: (context: { formData: any }) => JSX.Element | Component
  cols?: {
    span?: number
    md?: number
    xs?: number
    sm?: number
    lg?: number
    xl?: number
  }
  itemProps?: {
    required?: boolean
    rules?: Array<{
      required?: boolean
      message?: string
      trigger?: 'blur' | 'change'
      min?: number
      max?: number
      pattern?: RegExp
      type?: string
      validator?: (rule: any, value: any, callback: any) => void
    }>
  }
  renderProps?: Record<string, any>
}
```

### MaSearchItem

```typescript
interface MaSearchItem {
  label: () => string
  prop: string
  render: () => JSX.Element
  renderProps?: {
    api?: () => Promise<any>
    dataHandle?: (response: any) => any[]
    [key: string]: any
  }
}
```

---

## 附录 B: 快速参考

### 常用 Icon

```
i-heroicons:pencil           # 编辑
i-heroicons:trash            # 删除
i-heroicons:plus             # 添加
i-heroicons:eye              # 查看
i-heroicons:document         # 文档
i-heroicons:arrow-down-tray  # 下载
i-heroicons:arrow-up-tray    # 上传
```

### 常用权限码格式

```
{module}:{entity}:{action}

示例:
channel:channel:save      # 渠道保存
channel:channel:update    # 渠道更新
channel:channel:delete    # 渠道删除
tenant:tenant:recovery    # 租户恢复
```

### ResultCode 枚举

```typescript
enum ResultCode {
  SUCCESS = 200,
  FAIL = 500,
}
```

---

**文档维护**: 请在修改组件使用方式时及时更新本文档。

**反馈**: 如有问题或建议，请联系开发团队。
