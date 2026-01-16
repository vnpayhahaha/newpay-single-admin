// hooks/useCopy.ts
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

type CopyStatus = '' | 'success' | 'fail'

export function useCopy() {
  const copyStatus = ref<CopyStatus>('')

  const copyText = async (text: string) => {
    try {
      if (!navigator.clipboard) {
        throw new Error('当前浏览器不支持剪贴板API')
      }
      
      await navigator.clipboard.writeText(text)
      copyStatus.value = 'success'
      
      ElMessage({
        message: '已复制到剪贴板',
        type: 'success',
        plain: true,
      })

      // 延迟重置状态
      setTimeout(() => {
        copyStatus.value = ''
      }, 1000)
    } catch (error) {
      copyStatus.value = 'fail'
      console.error('复制失败:', error)
      
      ElMessage({
        message: '复制失败，请手动选择文本复制',
        type: 'error',
        plain: true,
      })
    }
  }

  return {
    copyStatus,
    copyText
  }
}