<!--
 - 文章分类管理主页面
-->
<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { batchDelete, page, realDelete, recovery } from '~/article/api/ArticleCategory.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import { useProTableToolbar } from '@mineadmin/pro-table'
import MaRecycle from '@/components/ma-recycle/index.vue'

import Form from './Form.vue'

defineOptions({ name: 'article:category' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const msg = useMessage()
const tableToolBar = useProTableToolbar()

// 管理回收站状态
const isRecovery = ref(false)
const maRecycleRef = ref()

const IndexName = 'ArticleCategory:Index'
const isRecoveryAdded = ref(false)
onActivated(() => {
  // 确保按钮只添加一次
  if (!isRecoveryAdded.value) {
    tableToolBar.add({
      name: IndexName,
      order: 0,
      show: true,
      render: () => h(MaRecycle, {
        'ref': maRecycleRef,
        'proxy': proTableRef.value,
        'isRecovery': isRecovery.value,
        'onUpdate:isRecovery': (value: boolean) => {
          isRecovery.value = value
        },
      }),
    })
    isRecoveryAdded.value = true
  }
})

onDeactivated(() => {
  // 移除工具栏按钮
  tableToolBar.remove(IndexName)
  isRecoveryAdded.value = false
})

// 弹窗配置
const maDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      // 验证通过后
      elForm.validate().then(() => {
        switch (formType) {
          // 新增
          case 'add':
            formRef.value.add().then((res: any) => {
              res.code === ResultCode.SUCCESS ? msg.success(t('crud.createSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            }).finally(() => {
              okLoadingState(false)
            })
            break
          // 修改
          case 'edit':
            formRef.value.edit().then((res: any) => {
              res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            }).finally(() => {
              okLoadingState(false)
            })
            break
        }
      }).catch().finally(() => {
        okLoadingState(false)
      })
    }
  },
})

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: '文章分类管理',
  },
  // 表格参数
  tableOptions: {
    on: {
      // 表格选择事件
      onSelectionChange: (selection: any[]) => selections.value = selection,
    },
  },
  // 搜索参数
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t('crud.search'),
      resetBtn: () => t('crud.reset'),
      isFoldBtn: () => t('crud.searchFold'),
      notFoldBtn: () => t('crud.searchUnFold'),
    },
  },
  // 搜索表单参数
  searchFormOptions: { labelWidth: '120px' },
  // 请求配置
  requestOptions: {
    api: async (params: any) => {
      const response = await page(params)
      // API返回的是数组,需要转换为分页格式
      const dataList = response.data || []
      return {
        ...response,
        data: {
          list: dataList,
          total: dataList.length,
          page: 1,
          page_size: dataList.length,
        },
      }
    },
  },
})

// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t),
  // 表格列
  tableColumns: getTableColumns(maDialog, formRef, t),
})

// 批量删除
function handleDelete() {
  const ids = selections.value.map((item: any) => item.id)
  if (isRecovery.value) {
    msg.delConfirm(t('crud.realDeleteDataMessage')).then(async () => {
      const response = await realDelete(ids)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value.refresh()
      }
    })
  }
  else {
    msg.delConfirm(t('crud.delMessage')).then(async () => {
      const response = await batchDelete(ids, false)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value.refresh()
      }
    })
  }
}

// 批量恢复
function handleRecovery() {
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('crud.restoreMessage')).then(async () => {
    const response = await recovery(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.restoreSuccess'))
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
          v-auth="['article:category:create']"
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
            v-auth="['article:category:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.delete') }}
          </el-button>
          <el-button
            v-if="isRecovery"
            v-auth="['article:category:recovery']"
            type="success"
            plain
            :disabled="selections.length < 1"
            @click="handleRecovery"
          >
            {{ t('crud.restore') }}
          </el-button>
        </el-button-group>
      </template>

      <!-- 数据为空时 -->
      <template #empty>
        <el-empty>
          <el-button
            v-auth="['article:category:create']"
            type="primary"
            @click="() => {
              maDialog.setTitle(t('crud.add'))
              maDialog.open({ formType: 'add' })
            }"
          >
            {{ t('crud.add') }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <!-- 新增、编辑表单 -->
        <Form ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">

</style>
