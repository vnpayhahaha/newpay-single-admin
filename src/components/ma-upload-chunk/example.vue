<template>
  <div>
    <h3>MaUploadChunk 事件测试示例</h3>
    
    <!-- 上传组件 -->
    <MaUploadChunk
      :action="uploadAction"
      :multiple="true"
      :max-files="3"
      :auto-upload="true"
      @upload-success="handleUploadSuccess"
      @success-action="handleSuccessAction"
      @upload-error="handleUploadError"
      @file-added="handleFileAdded"
      @file-removed="handleFileRemoved"
      @upload-progress="handleUploadProgress"
    />
    
    <!-- 事件日志显示区域 -->
    <div class="event-logs">
      <h4>事件触发日志:</h4>
      <div class="log-container">
        <div
          v-for="(log, index) in eventLogs"
          :key="index"
          class="log-item"
          :class="`log-${log.type}`"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-event">{{ log.event }}</span>
          <div class="log-data">{{ JSON.stringify(log.data, null, 2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MaUploadChunk from './index.vue'

interface FileItem {
  id: string
  file: File
  name: string
  size: number
  percentage: number
  status: 'ready' | 'uploading' | 'success' | 'error' | 'canceled' | null
  uploading: boolean
  calculatingHash: boolean
  hashProgress: number
  hash?: string
  chunkInfo: {
    current: number
    total: number
  } | null
  errorMessage: string | null
  result?: any
}

interface LogItem {
  time: string
  event: string
  type: 'success' | 'error' | 'info'
  data: any
}

const eventLogs = ref<LogItem[]>([])

// 模拟上传函数
const uploadAction = async (formData: FormData): Promise<any> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟上传成功响应
  return {
    code: 200,
    data: {
      fileId: Date.now().toString(),
      url: 'https://example.com/uploaded-file.png',
      message: '文件上传成功'
    },
    message: '上传成功'
  }
}

// 添加日志的辅助函数
function addLog(event: string, type: LogItem['type'], data: any) {
  eventLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    event,
    type,
    data
  })
  
  // 限制日志数量
  if (eventLogs.value.length > 20) {
    eventLogs.value = eventLogs.value.slice(0, 20)
  }
}

// 事件处理函数
function handleUploadSuccess(fileItem: FileItem, result: any) {
  addLog('upload-success', 'success', {
    fileName: fileItem.name,
    fileSize: fileItem.size,
    result
  })
  console.log('外部组件接收到 upload-success 事件:', { fileItem, result })
}

function handleSuccessAction(fileItem: FileItem, eventData: any) {
  addLog('success-action', 'success', {
    fileName: fileItem.name,
    isManual: eventData?.manual || false,
    actionType: eventData?.actionType || 'unknown',
    eventData
  })
  console.log('外部组件接收到 success-action 事件:', { fileItem, eventData })
  
  // 这里可以执行成功后的具体操作
  if (eventData?.manual) {
    console.log('这是用户手动触发的成功操作')
  } else {
    console.log('这是上传完成后自动触发的成功操作')
  }
}

function handleUploadError(fileItem: FileItem, error: Error) {
  addLog('upload-error', 'error', {
    fileName: fileItem.name,
    error: error.message
  })
  console.log('外部组件接收到 upload-error 事件:', { fileItem, error })
}

function handleFileAdded(fileItem: FileItem) {
  addLog('file-added', 'info', {
    fileName: fileItem.name,
    fileSize: fileItem.size
  })
  console.log('外部组件接收到 file-added 事件:', fileItem)
}

function handleFileRemoved(fileItem: FileItem) {
  addLog('file-removed', 'info', {
    fileName: fileItem.name
  })
  console.log('外部组件接收到 file-removed 事件:', fileItem)
}

function handleUploadProgress(fileItem: FileItem, percentage: number) {
  addLog('upload-progress', 'info', {
    fileName: fileItem.name,
    percentage
  })
  console.log('外部组件接收到 upload-progress 事件:', { fileItem, percentage })
}
</script>

<style scoped>
.event-logs {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
}

.log-container {
  max-height: 400px;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 8px;
}

.log-item {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.log-success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
}

.log-error {
  background: #f8d7da;
  border: 1px solid #f5c2c7;
}

.log-info {
  background: #d1ecf1;
  border: 1px solid #bee5eb;
}

.log-time {
  font-weight: bold;
  color: #666;
  margin-right: 8px;
}

.log-event {
  font-weight: bold;
  color: #333;
  margin-right: 8px;
}

.log-data {
  margin-top: 4px;
  white-space: pre-wrap;
  color: #555;
}
</style>