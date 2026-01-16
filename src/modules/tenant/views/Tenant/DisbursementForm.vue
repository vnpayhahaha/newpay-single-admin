<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="ts">
import type { TenantVo } from '~/tenant/api/Tenant.ts'
import { save } from '~/tenant/api/Tenant.ts'
import getFormItems from './components/GetDisbursementFormItems.tsx'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const { data = null } = defineProps<{
  data?: TenantVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<TenantVo>({})

useForm('maFormRef').then((form: MaFormExpose) => {
  if (data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
  }
  form.setItems(getFormItems(t, formModel.value))
  form.setOptions({
    labelWidth: '150px',
  })
})

// 更新操作 GetDisbursementFormItems
function edit(): Promise<any> {
  return new Promise((resolve, reject) => {
    save(formModel.value.id as number, formModel.value).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err.response.message)
    })
  })
}

defineExpose({
  edit,
  maForm: maFormRef,
})
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss">

</style>
