<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import type { Avatar } from '../../types'
import { ElMessage } from 'element-plus'

// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    // 这里还有其他不确定的参数
    props?: Avatar
  }
}>()
const copyStatus = ref('') // 用于复制状态的反馈
// 复制文本方法
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copyStatus.value = 'success'
    ElMessage({
      message: '已复制到剪切板',
      type: 'success',
      plain: true,
    })
    // 延迟0.1秒重置复制状态
    setTimeout(() => {
      copyStatus.value = ''
    }, 1000)
  }
  catch (error) {
    copyStatus.value = 'fail'
    console.log('复制失败')
  }
}
</script>

<template>
  <div class="flex items-center group">
    <el-text class="mx-1">
      {{ data.row[props?.prop] }}
    </el-text>
    <!-- 复制按钮 -->
    <el-tooltip :content="copyStatus === 'success' ? '已复制' : '复制'" placement="top">
      <ma-svg-icon
        class="cursor-pointer tooltip"
        :name="copyStatus === 'success' ? 'i-emojione:white-heavy-check-mark' : 'i-nimbus:copy'"
        @click="copyText(data.row[props?.prop])"
      />
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
/* 默认隐藏 tooltip */
.tooltip {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

/* 当父级 div:hover 时显示 tooltip */
.group:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
