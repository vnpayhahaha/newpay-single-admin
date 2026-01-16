<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import type { Avatar } from '../../types'

// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: Avatar
    prop?: string | null
  }
}>()
</script>

<template>
  <el-avatar
    :src="props?.prop ? data.row[props.prop] : null"
    v-bind="props?.props"
  />
</template>

<style scoped lang="scss">

</style>
