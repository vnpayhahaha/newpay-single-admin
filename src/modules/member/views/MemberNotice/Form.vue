<!--
 - 会员通知管理表单页面
-->
<script setup lang="ts">
import type { MemberNoticeVo } from '~/member/api/MemberNotice.ts'
import { save, update, batchCreate } from '~/member/api/MemberNotice.ts'
import { getSingleFormItems } from './components/GetFormItems.tsx'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'

const { formType = 'add', data = null } = defineProps<{
  formType: 'add' | 'edit'
  data?: MemberNoticeVo | null
}>()

const i18n = useTrans() as TransType
const local = i18n.localTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<any>({
  title: '',
  type: 1,
  member_ids: [],
  content: '',
  remark: '',
})

useForm('maFormRef').then((form: MaFormExpose) => {
  if (formType === 'edit' && data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
    // 编辑时，如果有 member_id，转换为数组
    if (data.member_id && data.member_id !== 0) {
      formModel.value.member_ids = [data.member_id]
    } else {
      formModel.value.member_ids = []
    }
  }
  form.setItems(getSingleFormItems(local))
  form.setOptions({
    labelWidth: '100px',
  })
})

// 创建操作
function add(): Promise<any> {
  return new Promise((resolve, reject) => {
    const submitData = { ...formModel.value }

    // 调试输出
    console.log('formModel.value:', formModel.value)
    console.log('submitData.member_ids:', submitData.member_ids)
    console.log('member_ids type:', typeof submitData.member_ids)
    console.log('member_ids length:', submitData.member_ids?.length)

    // 如果没有选择会员或选择为空数组，调用单个创建 API（全体会员）
    if (!submitData.member_ids || submitData.member_ids.length === 0) {
      // 单个通知，member_id = 0 表示全体会员
      delete submitData.member_ids
      console.log('调用 save API (全体会员):', submitData)
      save({ ...submitData, member_id: 0 }).then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
      }).catch((err) => {
        reject(err)
      })
    }
    // 如果只选择了一个会员，调用单个创建 API
    else if (submitData.member_ids.length === 1) {
      const memberId = submitData.member_ids[0]
      delete submitData.member_ids
      console.log('调用 save API (单个会员):', { ...submitData, member_id: memberId })
      save({ ...submitData, member_id: memberId }).then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
      }).catch((err) => {
        reject(err)
      })
    }
    // 如果选择了多个会员，调用批量创建 API
    else {
      console.log('调用 batchCreate API (多个会员):', submitData)
      batchCreate(submitData).then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
      }).catch((err) => {
        reject(err)
      })
    }
  })
}

// 更新操作
function edit(): Promise<any> {
  return new Promise((resolve, reject) => {
    // 编辑时只能编辑单个通知，使用原有的 member_id
    const submitData = { ...formModel.value }
    delete submitData.member_ids

    update(formModel.value.id as number, submitData).then((res: any) => {
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
