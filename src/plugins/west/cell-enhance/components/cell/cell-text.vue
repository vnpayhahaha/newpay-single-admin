<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import { getDictionaryItem } from '../../utils/tools'
import type { Text } from '../../types'

// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: Text
    prop?: string | null
    dictName?: string | ''
    tagColors?: Record<number, string>
  }
}>()

const modelValue = computed(() => {
  return props?.prop ? data.row[props.prop] : null
})

// 提取字典名，避免重复计算
const dictName = props?.dictName || ''

const textProps = computed(() => {
  return {
    ...props?.props,
    type: modelValue.value !== null && modelValue.value !== undefined
      ? props?.tagColors?.[modelValue.value] || 'default'
      : 'default',
  }
})

// 提供安全的字典标签获取
function safeGetLabel(key: string | number) {
  return getDictionaryItem(dictName, key)
}
</script>

<template>
  <el-text
    v-bind="textProps"
  >
    <ma-svg-icon size="1.5em" name="i-ph:dot-outline-fill" />
    {{ safeGetLabel(modelValue).label }}
  </el-text>
</template>

<style scoped lang="scss">
:deep(.el-tag) {
    border: none;
}
</style>
