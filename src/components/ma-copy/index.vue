<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useLocalTrans } from '@/hooks/useLocalTrans.ts'
const props = defineProps<{
  class?: string
  content: string
}>()

const copyStatus = ref('')

async function copyText() {
  try {
    await navigator.clipboard.writeText(props.content)
    copyStatus.value = 'success'
    ElMessage.success(t('common.copySueccess'))
    setTimeout(() => (copyStatus.value = ''), 1500)
  } catch {
    copyStatus.value = 'fail'
    ElMessage.error(t('common.copyError'))
  }
}
const t = useLocalTrans()

</script>

<template>
  <div class="copy-container">
    <el-text :class="`content-text `+props.class">{{ content }}</el-text>
    <el-tooltip v-if="content" :content="copyStatus === 'success' ? t('common.copyed') : t('common.copy')" placement="top">
      <ma-svg-icon
        class="copy-icon"
        :name="copyStatus === 'success' ? 'i-emojione:white-heavy-check-mark' : 'i-nimbus:copy'"
        @click="copyText"
      />
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.copy-container {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover .copy-icon {
    opacity: 1;
    visibility: visible;
  }
}

.copy-icon {
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.content-text {
  white-space: pre-wrap;
}
</style>
