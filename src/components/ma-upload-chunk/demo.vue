<!--
 - 分片上传组件使用示例
-->
<template>
  <div class="upload-demo-container">
    <h2>分片上传组件演示</h2>
    
    <!-- 基础使用 (URL字符串方式) -->
    <el-card class="demo-card">
      <template #header>
        <h3>基础使用 (URL字符串方式)</h3>
      </template>
      <MaUploadChunk
        ref="basicUploadRef"
        :action="uploadUrl"
        :chunk-size="1024 * 1024"
        :max-files="3"
        :max-file-size="100 * 1024 * 1024"
        accept="*"
        @file-added="onFileAdded"
        @upload-success="onUploadSuccess"
        @upload-error="onUploadError"
      />
    </el-card>

    <!-- 使用API函数方式 -->
    <el-card class="demo-card">
      <template #header>
        <h3>使用API函数方式</h3>
      </template>
      <MaUploadChunk
        ref="apiFunctionUploadRef"
        :action="uploadFunction"
        :chunk-size="2 * 1024 * 1024"
        :max-files="1"
        :auto-upload="true"
        :multiple="false"
        accept="*"
        @upload-success="onUploadSuccess"
        @upload-error="onUploadError"
      />
    </el-card>

    <!-- 高级配置 -->
    <el-card class="demo-card">
      <template #header>
        <h3>高级配置</h3>
      </template>
      <MaUploadChunk
        ref="advancedUploadRef"
        :action="uploadUrl"
        :chunk-size="5 * 1024 * 1024"
        :max-files="5"
        :max-file-size="500 * 1024 * 1024"
        :concurrency="5"
        :retry-count="5"
        :headers="customHeaders"
        :data="customData"
        tip="支持大文件上传，最大500MB"
        success-action-text="下载"
        @upload-success="onUploadSuccess"
        @success-action="onSuccessAction"
      />
    </el-card>

    <!-- 操作按钮 -->
    <div class="demo-actions">
      <el-button type="primary" @click="startAllUploads">
        开始所有上传
      </el-button>
      <el-button type="warning" @click="clearAllFiles">
        清空所有文件
      </el-button>
      <el-button type="info" @click="getUploadStats">
        获取上传统计
      </el-button>
    </div>

    <!-- 上传统计 -->
    <el-card v-if="stats" class="stats-card">
      <template #header>
        <h3>上传统计</h3>
      </template>
      <div class="stats-content">
        <p>总文件数: {{ stats.total }}</p>
        <p>上传成功: {{ stats.success }}</p>
        <p>上传中: {{ stats.uploading }}</p>
        <p>上传失败: {{ stats.failed }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MaUploadChunk from './index.vue'
import { useMessage } from '@/hooks/useMessage'
import { upload as bankUpload } from '~/transaction/api/BankDisbursementUpload'

const message = useMessage()

// 组件引用
const basicUploadRef = ref()
const apiFunctionUploadRef = ref()
const advancedUploadRef = ref()

// 上传配置
const uploadUrl = '/api/upload/chunk'

// 使用API函数的上传方法
const uploadFunction = async (formData: FormData, signal?: AbortSignal) => {
  try {
    const response = await bankUpload(formData)
    return response
  } catch (error: any) {
    throw new Error(error.message || '上传失败')
  }
}

const customHeaders = {
  'X-Custom-Header': 'test-value'
}
const customData = {
  category: 'demo',
  source: 'upload-test'
}

// 统计数据
const stats = ref<{
  total: number
  success: number
  uploading: number
  failed: number
} | null>(null)

// 事件处理
const onFileAdded = (file: any) => {
  console.log('文件添加:', file)
  message.success(`文件 ${file.name} 已添加`)
}

const onUploadSuccess = (file: any, result: any) => {
  console.log('上传成功:', file, result)
  message.success(`文件 ${file.name} 上传成功`)
}

const onUploadError = (file: any, error: Error) => {
  console.error('上传失败:', file, error)
  message.error(`文件 ${file.name} 上传失败: ${error.message}`)
}

const onSuccessAction = (file: any, result: any) => {
  console.log('成功操作:', file, result)
  message.info(`执行成功操作: ${file.name}`)
}

// 操作方法
const startAllUploads = () => {
  basicUploadRef.value?.uploadAllFiles()
  apiFunctionUploadRef.value?.uploadAllFiles()
  advancedUploadRef.value?.uploadAllFiles()
  message.info('开始批量上传')
}

const clearAllFiles = () => {
  basicUploadRef.value?.clearFiles()
  apiFunctionUploadRef.value?.clearFiles()
  advancedUploadRef.value?.clearFiles()
  message.info('已清空所有文件')
}

const getUploadStats = () => {
  const allRefs = [basicUploadRef, apiFunctionUploadRef, advancedUploadRef]
  let total = 0
  let success = 0
  let uploading = 0
  let failed = 0

  allRefs.forEach(ref => {
    if (ref.value) {
      const files = ref.value.getFiles()
      const successFiles = ref.value.getSuccessFiles()
      const uploadingFiles = ref.value.getUploadingFiles()
      const failedFiles = ref.value.getFailedFiles()

      total += files.length
      success += successFiles.length
      uploading += uploadingFiles.length
      failed += failedFiles.length
    }
  })

  stats.value = { total, success, uploading, failed }
  message.info('统计信息已更新')
}
</script>

<style scoped>
.upload-demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  margin-bottom: 20px;
}

.demo-actions {
  margin: 20px 0;
  display: flex;
  gap: 12px;
}

.stats-card {
  background-color: var(--el-color-info-light-9);
}

.stats-content p {
  margin: 8px 0;
  font-size: 14px;
}
</style>