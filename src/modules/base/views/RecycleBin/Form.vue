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
import type { RecycleBinVo } from '~/base/api/RecycleBin.ts'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'

const { data = null } = defineProps<{
  data?: RecycleBinVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<RecycleBinVo>({})

useForm('maFormRef').then((form: MaFormExpose) => {
  form.setOptions({
    labelWidth: '80px',
  })
})

defineExpose({
  maForm: maFormRef,
})
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss">

</style>
