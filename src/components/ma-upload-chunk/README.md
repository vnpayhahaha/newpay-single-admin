# Ma-Upload-Chunk 分片上传组件

## 功能特性

✅ **分片上传**: 大文件自动分片上传，支持断点续传
✅ **并发控制**: 可配置分片并发上传数量，提升上传效率  
✅ **文件哈希**: 自动计算文件MD5哈希值，确保文件完整性
✅ **进度显示**: 实时显示上传进度，包括哈希计算和分片进度
✅ **错误重试**: 支持分片上传失败自动重试
✅ **状态管理**: 完整的文件状态跟踪（准备、上传中、成功、失败、取消）
✅ **多文件支持**: 支持多文件批量上传
✅ **自动上传**: 可配置选择文件后自动开始上传
✅ **国际化**: 内置中英文多语言支持

## 基础用法

```vue
<template>
  <MaUploadChunk
    :action=\"/api/upload/chunk\"
    :chunk-size=\"2 * 1024 * 1024\"
    :max-files=\"5\"
    :max-file-size=\"100 * 1024 * 1024\"
    @upload-success=\"onUploadSuccess\"
  />
</template>

<script setup>
const onUploadSuccess = (file, result) => {
  console.log('上传成功:', file, result)
}
</script>
```

## 属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| action | string | - | **必需** 分片上传接口地址 |
| multiple | boolean | false | 是否支持多文件上传 |
| accept | string | '' | 接受的文件类型 |
| chunkSize | number | 2MB | 分片大小(字节) |
| tip | string | '' | 提示文本 |
| maxFiles | number | 5 | 最大文件数量 |
| maxFileSize | number | 1GB | 最大文件大小(字节) |
| headers | object | {} | 自定义请求头 |
| data | object | {} | 自定义请求参数 |
| showSuccessAction | boolean | true | 是否显示成功后操作按钮 |
| successActionText | string | '' | 成功操作按钮文本 |
| concurrency | number | 3 | 并发上传分片数量 |
| retryCount | number | 3 | 失败重试次数 |
| autoUpload | boolean | false | 是否自动开始上传 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| file-added | (file) | 文件添加时触发 |
| file-removed | (file) | 文件移除时触发 |
| upload-progress | (file, percentage) | 上传进度更新 |
| upload-success | (file, result) | 上传成功 |
| upload-error | (file, error) | 上传失败 |
| upload-canceled | (file) | 上传取消 |
| success-action | (file, result) | 成功操作按钮点击 |

## 方法

通过 `ref` 调用组件方法：

```javascript
const uploadRef = ref()

// 清空所有文件
uploadRef.value.clearFiles()

// 批量上传所有文件
uploadRef.value.uploadAllFiles()

// 获取文件列表
const files = uploadRef.value.getFiles()
const successFiles = uploadRef.value.getSuccessFiles()
const uploadingFiles = uploadRef.value.getUploadingFiles()
const failedFiles = uploadRef.value.getFailedFiles()

// 操作单个文件
uploadRef.value.uploadFile(file)
uploadRef.value.cancelUpload(file)
uploadRef.value.removeFile(file)
```

## 高级用法

### 自定义请求头和参数

```vue
<MaUploadChunk
  action=\"/api/upload/chunk\"
  :headers=\"{ 'Authorization': 'Bearer ' + token }\"
  :data=\"{ category: 'document', userId: currentUser.id }\"
/>
```

### 自动上传配置

```vue
<MaUploadChunk
  action=\"/api/upload/chunk\"
  :auto-upload=\"true\"
  :multiple=\"false\"
  accept=\"image/*\"
/>
```

### 大文件优化配置

```vue
<MaUploadChunk
  action=\"/api/upload/chunk\"
  :chunk-size=\"10 * 1024 * 1024\"
  :concurrency=\"5\"
  :retry-count=\"5\"
  :max-file-size=\"1024 * 1024 * 1024\"
/>
```

## 服务端接口要求

分片上传接口需要接收以下参数：

```javascript
// POST /api/upload/chunk
{
  file: Blob,          // 分片文件数据
  fileId: string,      // 文件唯一标识
  index: number,       // 分片索引(从1开始)
  total: number,       // 总分片数
  fileName: string,    // 文件名
  fileSize: number,    // 文件总大小
  fileHash: string,    // 文件MD5哈希值
  fileType: string,    // 文件类型
  // ...其他自定义参数
}
```

成功响应格式：
```javascript
{
  code: 200,
  data: {
    // 最后一个分片时返回完整文件信息
    url: 'https://example.com/file.pdf',
    size: 1024000,
    // ...其他文件信息
  },
  message: 'success'
}
```

## 样式定制

组件使用 Element Plus 的设计语言，支持通过 CSS 变量自定义样式：

```css
:deep(.chunk-upload-container) {
  --el-color-primary: #your-primary-color;
}

.uploading-file {
  border-left-color: var(--el-color-primary);
}
```

## 注意事项

1. 确保服务端支持分片上传和文件合并
2. 大文件上传时建议调整 `chunkSize` 和 `concurrency` 参数
3. 根据网络环境调整 `retryCount` 重试次数
4. 文件哈希计算可能耗时，大文件请注意用户体验