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

import { deleteByIds, page } from '~/tenant/api/TenantAccount.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import Form from './Form.vue'
import ChangeBalanceAvailableForm from './components/changeBalanceAvailableForm.vue'
import ChangeBalanceFrozenForm from './components/changeBalanceFrozenForm.vue'

defineOptions({ name: 'tenant:tenant_account' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
// const setFormRef = ref()
const changeBalanceAvailableFormRef = ref()
const changeBalanceFrozenFormRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans

const msg = useMessage()

// 弹窗配置
const maDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'sub'].includes(formType)) {
      console.log('保存数据')
      const elForm = changeBalanceAvailableFormRef.value.maForm.getElFormRef()
      // 验证通过后
      elForm.validate().then(() => {
        switch (formType) {
          // 加分
          case 'add':
            changeBalanceAvailableFormRef.value.add().then((res: any) => {
              console.log('res', res)
              res?.code === ResultCode.SUCCESS ? msg.success(t('tenantAccount.addSuccess')) : msg.error(res.message)
              maDialog.close()
              delayRefresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            })
            break
          // 减分
          case 'sub':
            changeBalanceAvailableFormRef.value.sub().then((res: any) => {
              res?.code === ResultCode.SUCCESS ? msg.success(t('tenantAccount.subSuccess')) : msg.error(res.message)
              maDialog.close()
              delayRefresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            })
            break
        }
      }).catch()
    }
    else if (['freeze', 'unfreeze'].includes(formType)) {
      console.log('freeze')
      const elForm = changeBalanceFrozenFormRef.value.maForm.getElFormRef()
      // 验证通过后
      elForm.validate().then(() => {
        switch (formType) {
          // 冻结
          case 'freeze':
            changeBalanceFrozenFormRef.value.freeze().then((res: any) => {
              res?.code === ResultCode.SUCCESS ? msg.success(t('tenantAccount.freezeSuccess')) : msg.error(res.message)
              maDialog.close()
              delayRefresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            })
            break
          // 解冻
          case 'unfreeze':
            changeBalanceFrozenFormRef.value.unfreeze().then((res: any) => {
              res?.code === ResultCode.SUCCESS ? msg.success(t('tenantAccount.unfreezeSuccess')) : msg.error(res.message)
              maDialog.close()
              delayRefresh()
            }).catch((err: any) => {
              msg.alertError(err.response?.data?.message)
            })
            break
        }
      }).catch()
    }

    okLoadingState(false)
  },
})

// 延迟刷新方法
function delayRefresh() {
  proTableRef.value.refresh()
}

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('tenantAccount.index'),
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
  tableColumns: getTableColumns(maDialog, formRef, t),
})

// 批量删除
// function handleDelete() {
//   const ids = selections.value.map((item: any) => item.id)
//   msg.confirm(t('crud.delMessage')).then(async () => {
//     const response = await deleteByIds(ids)
//     if (response.code === ResultCode.SUCCESS) {
//       msg.success(t('crud.delSuccess'))
//       proTableRef.value.refresh()
//     }
//   })
// }
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #actions>
        <!-- <el-button
          v-auth="['tenant:tenant_account:save']"
          type="primary"
          @click="() => {
            maDialog.setTitle(t('crud.add'))
            maDialog.open({ formType: 'add' })
          }"
        >
          {{ t('crud.add') }}
        </el-button> -->
      </template>

      <template #toolbarLeft />
      <!-- 数据为空时 -->
      <template #empty>
        <!-- <el-empty>
          <el-button
            v-auth="['tenant:tenant_account:save']"
            type="primary"
            @click="() => {
              maDialog.setTitle(t('crud.add'))
              maDialog.open({ formType: 'add' })
            }"
          >
            {{ t('crud.add') }}
          </el-button>
        </el-empty> -->
      </template>
    </MaProTable>

    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <!-- 新增、编辑表单 -->
        <!-- <Form ref="formRef" :form-type="formType" :data="data" /> -->
        <ChangeBalanceAvailableForm v-if="formType === 'add' || formType === 'sub'" ref="changeBalanceAvailableFormRef" :form-type="formType" :data="data" />
        <ChangeBalanceFrozenForm v-else-if="formType === 'freeze' || formType === 'unfreeze'" ref="changeBalanceFrozenFormRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">

</style>
