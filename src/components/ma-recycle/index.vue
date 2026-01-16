<script setup lang="ts">
// 定义 props 来接收 `ma-pro-table` 传入的 proxy 参数
import type { MaProTableExpose } from '@mineadmin/pro-table'
// import { ElMessage } from 'element-plus'

const { proxy, isRecovery } = defineProps<{ proxy: MaProTableExpose, isRecovery: boolean }>()

const emit = defineEmits(['update:isRecovery'])

async function execute() {
  const newValue = !isRecovery
  emit('update:isRecovery', newValue)
  proxy.setRequestParams({
    recycle: newValue,
  }, false)
  // 执行刷新表格
  await proxy?.refresh?.()
  // ElMessage.success('表格刷新成功')
}
</script>

<template>
  <!-- 加入 circle 属性成为圆按钮，与系统的保持统一 -->
  <el-button class="el-button is-circle ml-[12px]" @click="execute">
    <ma-svg-icon
      v-if="isRecovery"
      name="i-ci:transfer" size="1.2em"
    />
    <ma-svg-icon
      v-else
      name="i-heroicons:trash" size="1.2em"
    />
  </el-button>
</template>
