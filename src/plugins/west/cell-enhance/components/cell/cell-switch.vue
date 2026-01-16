<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import type { Switch } from '../../types'
import { computed, onMounted, ref } from 'vue'
// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: Switch
    prop?: string | null
    dictName?: string | ''
  }
}>()

const modelValue = computed(() => {
  return props?.prop ? data.row[props.prop] : null
})
// 添加挂载标志位
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
// 统一事件处理函数
function handleEvent(eventHandlers: Record<string, (...args: any[]) => void> = {}) {
  const handlerMap = {}
  Object.keys(eventHandlers).forEach((event) => {
    handlerMap[event] = (...args: any[]) => {
      // 关键：仅在挂载后触发真实事件
      if (!isMounted.value) return
      const rowData = data.row
      eventHandlers[event](...args, rowData, proxy)
    }
  })
  return handlerMap
}
</script>

<template>
  <el-switch
    v-bind="props?.props"
    v-model="modelValue"
    v-on="handleEvent(props?.props?.on)"
  />
</template>

<style scoped lang="scss">

</style>
