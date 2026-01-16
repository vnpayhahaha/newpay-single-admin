<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import type { MemberNoticeVo } from '~/member/api/MemberNotice.ts'

import { page, batchDelete } from '~/member/api/MemberNotice.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import Form from './Form.vue'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

defineOptions({ name: 'member:notice' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const singleFormRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()

// 单个通知/编辑通知弹窗
const singleDialog: UseDialogExpose = useDialog({
  width: '700px',
  ok: async ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    try {
      const elForm = singleFormRef.value.maForm.getElFormRef()
      await elForm.validate()

      const res = formType === 'add'
        ? await singleFormRef.value.add()
        : await singleFormRef.value.edit()

      if (res.code === ResultCode.SUCCESS) {
        msg.success(formType === 'add' ? local('MemberNotice.create_success') : local('MemberNotice.update_success'))
        singleDialog.close()
        proTableRef.value.refresh()
      } else {
        msg.error(res.message)
      }
    } catch (err: any) {
      msg.alertError(err)
    } finally {
      okLoadingState(false)
    }
  },
})

// 表格参数配置
const options = ref<MaProTableOptions>({
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => local('MemberNotice.lable'),
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
      isFoldBtn: () => t('crud.searchFold'),
      notFoldBtn: () => t('crud.searchUnFold'),
    },
  },
  searchFormOptions: { labelWidth: '90px' },
  requestOptions: {
    api: page,
  },
})

// 处理编辑操作
const handleEdit = (row: MemberNoticeVo) => {
  singleDialog.setTitle(local('MemberNotice.edit_notice'))
  singleDialog.open({ formType: 'edit', data: { ...row } })
}

// 处理删除操作
const handleDel = (row: MemberNoticeVo) => {
  msg.confirm(local('MemberNotice.confirm_delete')).then(async () => {
    const response = await batchDelete([row.id])
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.delSuccess'))
      proTableRef.value.refresh()
    }
  })
}

// 批量删除
function handleBatchDelete() {
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('crud.delMessage')).then(async () => {
    const response = await batchDelete(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.delSuccess'))
      proTableRef.value.refresh()
    }
  })
}

// 架构配置
const schema = ref<MaProTableSchema>({
  searchItems: getSearchItems(t, local),
  tableColumns: getTableColumns(t, local, () => proTableRef.value.refresh(), handleEdit, handleDel),
})
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #actions>
        <el-button
          v-auth="['member:notice:create']"
          type="primary"
          @click="() => {
            singleDialog.setTitle(local('MemberNotice.create_notice'))
            singleDialog.open({ formType: 'add', data: null })
          }"
        >
          {{ local('MemberNotice.create_notice') }}
        </el-button>
      </template>

      <template #toolbarLeft>
        <el-button
          v-auth="['member:notice:delete']"
          type="danger"
          plain
          :disabled="selections.length < 1"
          @click="handleBatchDelete"
        >
          {{ t('crud.delete') }}
        </el-button>
      </template>

      <template #empty>
        <el-empty>
          <el-button
            v-auth="['member:notice:create']"
            type="primary"
            @click="() => {
              singleDialog.setTitle(local('MemberNotice.create_notice'))
              singleDialog.open({ formType: 'add', data: null })
            }"
          >
            {{ local('MemberNotice.create_notice') }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <!-- 单个/批量通知弹窗 -->
    <component :is="singleDialog.Dialog">
      <template #default="{ formType, data }">
        <Form ref="singleFormRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">

</style>
