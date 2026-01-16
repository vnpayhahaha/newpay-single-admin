<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import { getDictionary } from '../../utils/tools'
import type { Text } from '../../types'

// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    props?: Text
    prop?: string | null
    dictName?: string | 'userDict'
  }
}>()

const dictName = props?.dictName || ''

const modelValue = computed(() => {
  return props?.prop ? data.row[props.prop] : null
})

// 提供安全的字典标签获取
function safeGetLabel(key: string | number) {
  return getDictionary(dictName, key)
}
</script>

<template>
  <el-text>
    {{ safeGetLabel(modelValue)?.nickname || '未知' }}
  </el-text>
</template>

<style scoped lang="scss">

</style>
