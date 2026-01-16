<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import type { Image } from '../../types'

const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: Image
    prop?: string | null
    dictName?: string | ''
  }
}>()

const imageProps = computed(() => {
  const prop = props?.prop ?? ''

  return {
    ...props?.props,
    src: data.row[prop] ?? '',
    previewSrcList: props?.props?.previewSrcList !== undefined
      ? props?.props?.previewSrcList || []
      : [],
    previewTeleported: props?.props?.previewTeleported ?? true,
  }
})

// 统一事件处理函数
function handleEvent(eventHandlers: Record<string, (...args: any[]) => void> = {}) {
  const handlerMap = {}
  Object.keys(eventHandlers).forEach((event) => {
    handlerMap[event] = (...args: any[]) => {
      const rowData = data.row
      eventHandlers[event](...args, rowData, proxy)
    }
  })
  return handlerMap
}
</script>

<template>
  <el-image
    v-bind="imageProps"
    v-on="handleEvent(props?.props?.on)"
  />
</template>
