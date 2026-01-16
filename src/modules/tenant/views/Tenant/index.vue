<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { deleteByIds, page, realDelete, recovery } from '~/tenant/api/Tenant.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import { useProTableToolbar } from '@mineadmin/pro-table'
import MaRecycle from '@/components/ma-recycle/index.vue'

import Form from './Form.vue'
import CollectionForm from './CollectionForm.vue'
import DisbursementForm from './DisbursementForm.vue'

defineOptions({ name: 'tenant:tenant' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const formCollectionRef = ref()
const formDisbursementRef = ref()
const setFormRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()
const tableToolBar = useProTableToolbar()

// 管理回收站状态
const isRecovery = ref(false)
const maRecycleRef = ref()

const IndexName = 'Tenant:Index'
const isRecoveryAdded = ref(false)
onActivated(() => {
  // console.log(`[${IndexName}] Activated`)
  // 确保按钮只添加一次
  if (!isRecoveryAdded.value) {
    tableToolBar.add({
      name: IndexName,
      order: 0,
      show: true,
      render: () => h(MaRecycle, {
        'ref': maRecycleRef, // 绑定引用
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
  // console.log(`[${IndexName}] Deactivated`)
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
              msg.alertError(err.response.data?.message)
            })
            break
          // 修改
          case 'edit':
            formRef.value.edit().then((res: any) => {
              res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response.data?.message)
            })
            break
        }
      }).catch()
    }
    okLoadingState(false)
  },
})

const collectionDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = formCollectionRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm.validate().then(() => {
      formCollectionRef.value.edit().then((res: any) => {
        res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
        collectionDialog.close()
        proTableRef.value.refresh()
      }).catch((err: any) => {
        msg.alertError(err.response.data?.message)
      })
    }).catch()
    okLoadingState(false)
  },
})

const disbursementDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = formDisbursementRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm.validate().then(() => {
      formDisbursementRef.value.edit().then((res: any) => {
        res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
        disbursementDialog.close()
        proTableRef.value.refresh()
      }).catch((err: any) => {
        msg.alertError(err.response.data?.message)
      })
    }).catch()
    okLoadingState(false)
  },
})

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('tenant.index'),
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
  searchFormOptions: { labelWidth: '150px' },
  // 请求配置
  requestOptions: {
    api: page,
  },
})
// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t),
  // 表格列
  tableColumns: getTableColumns(maDialog, collectionDialog, disbursementDialog, t),
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
      const response = await deleteByIds(ids)
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
          v-auth="['tenant:tenant:save']"
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
            v-auth="['tenant:tenant:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.delete') }}
          </el-button>
          <el-button
            v-if="isRecovery"
            v-auth="['tenant:tenant:recovery']"
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
            v-auth="['tenant:tenant:save']"
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
    <component :is="collectionDialog.Dialog">
      <template #default="{ data }">
        <CollectionForm ref="formCollectionRef" :data="data" />
      </template>
    </component>
    <component :is="disbursementDialog.Dialog">
      <template #default="{ data }">
        <DisbursementForm ref="formDisbursementRef" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">

</style>
