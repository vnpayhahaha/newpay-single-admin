# NewPay Admin 代码模式速查表

本文档提供快速参考，帮助开发者快速查找常用的代码模式和最佳实践。

---

## 快速导航

- [新增模块流程](#新增模块流程)
- [常用代码片段](#常用代码片段)
- [调试技巧](#调试技巧)
- [常见错误](#常见错误)

---

## 新增模块流程

### 第1步：创建模块目录结构

```bash
# 创建基本结构
mkdir -p src/modules/mymodule/{views/MyEntity,api,locales}

# 创建初始文件
touch src/modules/mymodule/api/MyEntity.ts
touch src/modules/mymodule/locales/{en[English].yaml,zh_CN[简体中文].yaml,zh_TW[繁體中文].yaml}
touch src/modules/mymodule/views/MyEntity/index.vue
touch src/modules/mymodule/views/MyEntity/Form.vue
touch src/modules/mymodule/views/MyEntity/components/{GetTableColumns.tsx,GetFormItems.tsx,GetSearchItems.tsx}
```

### 第2步：编写 API 文件

文件：`src/modules/mymodule/api/MyEntity.ts`

```typescript
import type { ResponseStruct } from "#/global"

// 定义 VO 类型
export interface MyEntityVo {
  id: number
  name: string
  description: string
  status: boolean
  created_at: string
  updated_at: string
}

// CRUD 操作
export function page(params: MyEntityVo): Promise<ResponseStruct<MyEntityVo[]>> {
  return useHttp().get("/admin/mymodule/myentity/list", { params })
}

export function create(data: MyEntityVo): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/mymodule/myentity", data)
}

export function save(id: number, data: MyEntityVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/mymodule/myentity/${id}`, data)
}

export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/mymodule/myentity", { data: ids })
}
```

### 第3步：编写国际化文件

文件：`src/modules/mymodule/locales/zh_CN[简体中文].yaml`

```yaml
myEntity:
  index: 我的实体
  name: 名称
  description: 描述
  status: 状态
  created_at: 创建时间
  updated_at: 更新时间

myEntityMenu:
  myEntity:
    list: 列表
    create: 新增
    update: 修改
    delete: 删除

enums:
  myEntity:
    status:
      true: 启用
      false: 停用
```

### 第4步：编写 Index.vue

文件：`src/modules/mymodule/views/MyEntity/index.vue`

```vue
<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
-->
<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { deleteByIds, page } from '~/mymodule/api/MyEntity.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import Form from './Form.vue'

defineOptions({ name: 'mymodule:myentity' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const msg = useMessage()

const maDialog: UseDialogExpose = useDialog({
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      elForm.validate().then(() => {
        switch (formType) {
          case 'add':
            formRef.value.add().then((res: any) => {
              res.code === ResultCode.SUCCESS ? msg.success(t('crud.createSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            }).finally(() => okLoadingState(false))
            break
          case 'edit':
            formRef.value.edit().then((res: any) => {
              res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            }).finally(() => okLoadingState(false))
            break
        }
      }).catch()
    }
    okLoadingState(false)
  },
})

const options = ref<MaProTableOptions>({
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('myEntity.index'),
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

const schema = ref<MaProTableSchema>({
  searchItems: getSearchItems(t),
  tableColumns: getTableColumns(maDialog, formRef, t),
})

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
          v-auth="['mymodule:myentity:save']"
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
        <el-button-group>
          <el-button
            v-auth="['mymodule:myentity:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.delete') }}
          </el-button>
        </el-button-group>
      </template>

      <template #empty>
        <el-empty>
          <el-button type="primary" @click="() => maDialog.open({ formType: 'add' })">
            {{ t('crud.add') }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <Form ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">
</style>
```

### 第5步：编写 Form.vue

```vue
<script setup lang="ts">
import type { MyEntityVo } from '~/mymodule/api/MyEntity.ts'
import { create, save } from '~/mymodule/api/MyEntity.ts'
import getFormItems from './components/GetFormItems.tsx'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const { formType = 'add', data = null } = defineProps<{
  formType: 'add' | 'edit'
  data?: MyEntityVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<MyEntityVo>({})

useForm('maFormRef').then((form: MaFormExpose) => {
  if (formType === 'edit' && data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
  }
  form.setItems(getFormItems(formType, t, formModel.value))
  form.setOptions({
    labelWidth: '150px',
  })
})

function add(): Promise<any> {
  return new Promise((resolve, reject) => {
    create(formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

function edit(): Promise<any> {
  return new Promise((resolve, reject) => {
    save(formModel.value.id as number, formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

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

### 第6步：编写 GetTableColumns.tsx

```tsx
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { MyEntityVo } from '~/mymodule/api/MyEntity.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/mymodule/api/MyEntity.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: MyEntityVo) => {
    return hasAuth(auth)
  }

  return [
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    { type: 'index' },
    { label: () => t('myEntity.name'), prop: 'name' },
    { label: () => t('myEntity.description'), prop: 'description' },
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
            show: ({ row }) => showBtn('mymodule:myentity:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('mymodule:myentity:delete', row),
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

### 第7步：编写 GetFormItems.tsx

```tsx
import type { MaFormItem } from '@mineadmin/form'
import type { MyEntityVo } from '~/mymodule/api/MyEntity.ts'

export default function getFormItems(
  formType: 'add' | 'edit' = 'add',
  t: any,
  model: MyEntityVo
): MaFormItem[] {
  if (formType === 'add') {
    model.status = true
  }

  return [
    {
      label: t('myEntity.name'),
      prop: 'name',
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t('myEntity.description'),
      prop: 'description',
      cols: { md: 12, xs: 24 },
      render: () => <el-input type="textarea" />,
    },
    {
      label: t('myEntity.status'),
      prop: 'status',
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
  ]
}
```

### 第8步：编写 GetSearchItems.tsx

```tsx
import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('myEntity.name'),
      prop: 'name',
      render: () => <el-input />,
    },
  ]
}
```

---

## 常用代码片段

### 1. 在表单中实现条件渲染

```tsx
{
  label: () => t('field.conditionalField'),
  prop: 'conditionalField',
  render: ({ formData }) => {
    // 根据其他字段的值决定是否显示
    const show = formData.parentField === 'specificValue'
    return show ? <el-input /> : null
  }
}
```

### 2. 在表格中实现标签渲染

```tsx
{
  label: () => t('field.status'),
  prop: 'status',
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'tag',
      data: [
        { label: '启用', value: true, color: '#67C23A' },
        { label: '禁用', value: false, color: '#F56C6C' },
      ],
    },
  },
}
```

### 3. 在表格中实现复制功能

```tsx
{
  label: () => t('field.copyField'),
  prop: 'copyField',
  width: '230px',
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'copy',
    },
  },
}
```

### 4. 远程搜索下拉框

```tsx
{
  label: () => t('field.remoteSelect'),
  prop: 'remoteSelectProp',
  render: () => <ma-remote-select filterable />,
  renderProps: {
    api: () => new Promise(resolve => 
      resolve(selectStatus('moduleName', 'fieldName_list'))
    ),
    dataHandle: (response: any) => {
      return response.data?.map((item: Common.StatusOptionItem) => {
        return { label: `${item.label}`, value: item.value }
      })
    },
  },
}
```

### 5. 获取表单验证错误

```typescript
// 触发表单验证
const elForm = formRef.value.maForm.getElFormRef()
elForm.validate().then(() => {
  // 验证通过
  console.log('验证通过')
}).catch((err) => {
  // 验证失败
  console.log('验证失败', err)
})
```

### 6. 批量操作示例

```typescript
function handleBatchOperation() {
  if (selections.value.length === 0) {
    msg.warning(t('crud.selectAtLeastOne'))
    return
  }
  
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('crud.confirmOperation')).then(async () => {
    const response = await batchOperationApi(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.operationSuccess'))
      proTableRef.value.refresh()
    }
  })
}
```

### 7. 动态表单字段

```tsx
{
  label: () => t('field.dynamicField'),
  prop: 'dynamicField',
  render: ({ formData }) => {
    // 根据响应式值动态决定渲染内容
    return formData.type === 'text' 
      ? <el-input /> 
      : <el-input-number />
  }
}
```

### 8. 表单字段校验规则

```tsx
{
  label: () => t('field.email'),
  prop: 'email',
  itemProps: {
    required: true,
    rules: [
      { required: true, message: t('error.emailRequired'), trigger: 'blur' },
      { type: 'email', message: t('error.emailFormat'), trigger: 'blur' },
    ],
  },
  render: () => <el-input type="email" />,
}
```

---

## 调试技巧

### 1. 在浏览器中调试 Vue 3

```typescript
// 在 main.ts 中添加
app.config.globalProperties.$debug = (msg: any) => {
  console.log('[DEBUG]', msg)
}

// 在组件中使用
$debug(formModel.value)
```

### 2. 查看请求/响应

```typescript
// 在 API 文件中添加日志
export function page(params: MyEntityVo): Promise<ResponseStruct<MyEntityVo[]>> {
  console.log('Request params:', params)
  return useHttp().get("/admin/mymodule/myentity/list", { params }).then(res => {
    console.log('Response:', res)
    return res
  })
}
```

### 3. 临时禁用某个元素

```vue
<!-- 使用 v-if 临时隐藏 -->
<el-button v-if="false" @click="handleDelete">删除</el-button>

<!-- 或使用 disabled 禁用 -->
<el-button :disabled="true">删除</el-button>
```

### 4. 输出表格数据

```typescript
// 在 Index.vue 中
const handleExportDebug = () => {
  console.log('Current selections:', selections.value)
  console.log('FormModel:', formModel.value)
  console.log('Table options:', options.value)
}
```

---

## 常见错误

### 错误1：类型不匹配

```typescript
// ✗ 错误
const formModel = ref<ChannelVo>({})
formModel.value.name = 123  // 类型不匹配

// ✓ 正确
const formModel = ref<ChannelVo>({})
formModel.value.name = '渠道名称'
```

### 错误2：缺少 ResultCode 检查

```typescript
// ✗ 错误
const result = await create(data)
// 直接使用，没有检查成功/失败

// ✓ 正确
const result = await create(data)
if (result.code === ResultCode.SUCCESS) {
  msg.success(t('crud.createSuccess'))
} else {
  msg.error(result.message)
}
```

### 错误3：忘记关闭对话框

```typescript
// ✗ 错误
formRef.value.add().then((res: any) => {
  msg.success(t('crud.createSuccess'))
  // 忘记关闭对话框
  proTableRef.value.refresh()
})

// ✓ 正确
formRef.value.add().then((res: any) => {
  msg.success(t('crud.createSuccess'))
  maDialog.close()  // 关闭对话框
  proTableRef.value.refresh()
})
```

### 错误4：API 调用中未处理错误

```typescript
// ✗ 错误
formRef.value.add().then((res: any) => {
  // 没有 catch
})

// ✓ 正确
formRef.value.add().then((res: any) => {
  msg.success(t('crud.createSuccess'))
  maDialog.close()
  proTableRef.value.refresh()
}).catch((err: any) => {
  msg.alertError(err.response?.data?.message)
}).finally(() => {
  okLoadingState(false)
})
```

### 错误5：国际化键不存在

```typescript
// ✗ 错误
t('myEntity.index')  // 如果没有定义这个键

// ✓ 正确
// 1. 先在 locales 文件中定义
// 2. 然后在代码中使用
t('myEntity.index')
```

### 错误6：权限检查不完整

```typescript
// ✗ 错误
{
  name: 'edit',
  onClick: ({ row }) => {
    dialog.open({ formType: 'edit', data: row })
  },
}

// ✓ 正确
{
  name: 'edit',
  show: ({ row }) => showBtn('module:entity:update', row),  // 检查权限
  onClick: ({ row }) => {
    dialog.open({ formType: 'edit', data: row })
  },
}
```

---

## 快速参考卡

### 文件类型和文件名约定

| 文件类型 | 命名规则 | 示例 |
|---------|---------|------|
| Vue 文件 | PascalCase | `Index.vue`, `Form.vue` |
| TSX 配置 | GetXxxxx.tsx | `GetTableColumns.tsx` |
| API 文件 | PascalCase.ts | `Channel.ts` |
| Hooks | useXxxxx.ts | `useDialog.ts` |
| 工具函数 | camelCase.ts | `hasAuth.ts` |
| 国际化 | 语言[描述].yaml | `zh_CN[简体中文].yaml` |

### 常用快捷键（假设使用 VSCode）

```
Ctrl+K Ctrl+X  - 删除行末空格
Ctrl+Shift+L   - 多光标选择
Ctrl+/         - 切换注释
Ctrl+Alt+Up/Dn - 复制行上/下
```

---

## 相关文档

更详细的信息请参考：
- [完整代码规范指南](./CODE_STANDARDS.md)
- [ESLint 配置](./eslint.config.js)
- [EditorConfig](../.editorconfig)
- [TypeScript 配置](./tsconfig.json)

