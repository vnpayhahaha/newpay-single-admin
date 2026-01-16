# MaUploadChunk 组件使用示例

## 概述

`MaUploadChunk` 组件现在支持两种上传方式：

1. **URL字符串方式** - 传统方式，直接传递上传接口URL
2. **函数方式** - 新增方式，传递自定义的上传函数

## 使用方式

### 1. URL字符串方式（兼容原有用法）

```vue
<template>
  <MaUploadChunk 
    :action="uploadUrl"
    :chunk-size="1024 * 1024"
    :max-files="3"
    @upload-success="onSuccess"
  />
</template>

<script setup>
const uploadUrl = '/api/upload/chunk'

const onSuccess = (file, result) => {
  console.log('上传成功:', file, result)
}
</script>
```

### 2. 函数方式（新功能）

```vue
<template>
  <MaUploadChunk 
    :action="uploadFunction"
    :chunk-size="2 * 1024 * 1024"
    :max-files="1"
    :auto-upload="true"
    @upload-success="onSuccess"
  />
</template>

<script setup>
import { upload as bankUpload } from '~/transaction/api/BankDisbursementUpload'

// 定义上传函数
const uploadFunction = async (formData, signal) => {
  try {
    const response = await bankUpload(formData)
    return response
  } catch (error) {
    throw new Error(error.message || '上传失败')
  }
}

const onSuccess = (file, result) => {
  console.log('上传成功:', file, result)
}
</script>
```

## 类型定义

```typescript
// 上传函数类型
type UploadFunction = (formData: FormData, signal?: AbortSignal) => Promise<ChunkUploadResponse>

// action参数类型
type ActionParam = string | UploadFunction

// 响应类型
interface ChunkUploadResponse {
  code: number
  data?: any
  message?: string
}
```

## 优势

### URL字符串方式
- 简单直接，适合标准REST API
- 无需额外封装，直接传URL即可
- 适用于大部分常见场景

### 函数方式
- **灵活性更高** - 可以在函数中进行自定义处理（验证、转换、错误处理等）
- **类型安全** - TypeScript 提供完整的类型检查
- **复用API函数** - 直接使用现有的API模块函数
- **更好的错误处理** - 可以在函数内部进行错误转换和处理
- **支持中断** - 通过AbortSignal支持取消上传

## 实际项目中的应用

在银行账单上传功能中，你可以直接使用API模块的函数：

```vue
<template>
  <MaUploadChunk 
    :action="uploadBankDisbursement"
    :chunk-size="5 * 1024 * 1024"
    :max-files="1"
    accept=".csv,.xlsx,.xls"
    tip="支持CSV、Excel格式的银行账单文件"
    @upload-success="handleUploadSuccess"
    @upload-error="handleUploadError"
  />
</template>

<script setup>
import { upload } from '~/transaction/api/BankDisbursementUpload'

const uploadBankDisbursement = async (formData, signal) => {
  // 可以在这里添加额外的验证逻辑
  if (!formData.get('file')) {
    throw new Error('请选择文件')
  }
  
  try {
    const response = await upload(formData)
    
    // 可以对响应进行处理
    if (response.code !== 200) {
      throw new Error(response.message || '上传失败')
    }
    
    return response
  } catch (error) {
    console.error('银行账单上传失败:', error)
    throw error
  }
}

const handleUploadSuccess = (file, result) => {
  // 处理上传成功
  console.log(`文件 ${file.name} 上传成功`, result)
  // 可能需要刷新页面数据或进行其他操作
}

const handleUploadError = (file, error) => {
  // 处理上传失败
  console.error(`文件 ${file.name} 上传失败:`, error)
}
</script>
```