<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<i18n lang="yaml">
en:
  uploadFile: Upload File
  selectFile: Select File
  startUpload: Start Upload
  cancelUpload: Cancel Upload
  removeFile: Remove
  viewFile: View
  uploadSuccess: Upload Success
  uploadFailed: Upload Failed
  calculatingHash: Calculating file hash...
  uploadProgress: Upload Progress
  chunkProgress: "Chunk: {current}/{total}"
  fileSizeExceeded: "File size cannot exceed {maxSize}"
  fileCountExceeded: "Maximum {maxFiles} files allowed"
  onlyOneFile: "Only one file allowed"
  hashCalculationFailed: "File hash calculation failed"
  uploadCanceled: "Upload canceled"
  chunkUploadFailed: "Chunk upload failed"
  uploadIncomplete: "Upload incomplete: {uploaded}/{total} chunks uploaded"
  defaultTip: "Supports files within {maxSize}, up to {maxFiles} files can be uploaded"
  fileTypeNotAllowed: "File type not allowed. Supported types: {types}"
  fileExtensionNotAllowed: "File extension not allowed. Supported extensions: {extensions}"
  ready: "Ready to upload"
  uploading: "Uploading"
  canceled: "Canceled"
  sizeUnitB: "B"
  sizeUnitKB: "KB"
  sizeUnitMB: "MB"
  sizeUnitGB: "GB"
  actionTypeError: "Action parameter must be a string URL or upload function"
zh_CN:
  uploadFile: 上传文件
  selectFile: 选择文件
  startUpload: 开始上传
  cancelUpload: 取消上传
  removeFile: 移除
  viewFile: 查看
  uploadSuccess: 上传成功
  uploadFailed: 上传失败
  calculatingHash: 正在计算文件哈希值...
  uploadProgress: 上传进度
  chunkProgress: "分片: {current}/{total}"
  fileSizeExceeded: "文件大小不能超过 {maxSize}"
  fileCountExceeded: "最多只能上传 {maxFiles} 个文件"
  onlyOneFile: "只能上传一个文件"
  hashCalculationFailed: "文件哈希计算失败"
  uploadCanceled: "上传已取消"
  chunkUploadFailed: "分片上传失败"
  uploadIncomplete: "上传不完整，已上传 {uploaded}/{total} 个分片"
  defaultTip: "支持{maxSize}以内的文件，最多上传{maxFiles}个文件"
  fileTypeNotAllowed: "不支持该文件类型，支持的类型：{types}"
  fileExtensionNotAllowed: "不支持该文件扩展名，支持的扩展名：{extensions}"
  ready: "准备上传"
  uploading: "上传中"
  canceled: "已取消"
  sizeUnitB: "B"
  sizeUnitKB: "KB"
  sizeUnitMB: "MB"
  sizeUnitGB: "GB"
  actionTypeError: "Action参数必须是字符串URL或上传函数"
zh_TW:
  uploadFile: 上傳文件
  selectFile: 選擇文件
  startUpload: 開始上傳
  cancelUpload: 取消上傳
  removeFile: 移除
  viewFile: 查看
  uploadSuccess: 上傳成功
  uploadFailed: 上傳失敗
  calculatingHash: 正在計算文件哈希值...
  uploadProgress: 上傳進度
  chunkProgress: "分片: {current}/{total}"
  fileSizeExceeded: "文件大小不能超過 {maxSize}"
  fileCountExceeded: "最多只能上傳 {maxFiles} 個文件"
  onlyOneFile: "只能上傳一個文件"
  hashCalculationFailed: "文件哈希計算失敗"
  uploadCanceled: "上傳已取消"
  chunkUploadFailed: "分片上傳失敗"
  uploadIncomplete: "上傳不完整，已上傳 {uploaded}/{total} 個分片"
  defaultTip: "支持{maxSize}以內的文件，最多上傳{maxFiles}個文件"
  fileTypeNotAllowed: "不支援該文件類型，支援的類型：{types}"
  fileExtensionNotAllowed: "不支援該文件擴展名，支援的擴展名：{extensions}"
  ready: "準備上傳"
  uploading: "上傳中"
  canceled: "已取消"
  sizeUnitB: "B"
  sizeUnitKB: "KB"
  sizeUnitMB: "MB"
  sizeUnitGB: "GB"
  actionTypeError: "Action參數必須是字符串URL或上傳函數"
</i18n>

<script setup lang="ts">
import type { UploadFile, UploadRawFile } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { nextTick, ref, computed } from "vue";
import SparkMD5 from "spark-md5";
import { useMessage } from "@/hooks/useMessage";
import { useLocalTrans } from "@/hooks/useLocalTrans";
import useHttp from "@/hooks/auto-imports/useHttp";

defineOptions({ name: "MaUploadChunk" });

const {
  // 必需参数 - 上传接口地址或上传函数
  action,
  // 可选参数
  multiple = false,
  accept = "",
  chunkSize = 2 * 1024 * 1024, // 2MB
  tip = "",
  maxFiles = 5,
  maxFileSize = 1024 * 1024 * 1024, // 1GB
  headers = {},
  data = {},
  showSuccessAction = true,
  successActionText = "",
  // 并发上传分片数量
  concurrency = 3,
  // 失败重试次数
  retryCount = 3,
  // 是否自动开始上传
  autoUpload = false,
  // 允许的MIME类型数组
  allowedTypes = [],
  // 允许的文件扩展名数组
  allowedExtensions = [],
} = defineProps<{
  action: ActionParam;
  multiple?: boolean;
  accept?: string;
  chunkSize?: number;
  tip?: string;
  maxFiles?: number;
  maxFileSize?: number;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  showSuccessAction?: boolean;
  successActionText?: string;
  concurrency?: number;
  retryCount?: number;
  autoUpload?: boolean;
  allowedTypes?: string[];
  allowedExtensions?: string[];
}>();

const emit = defineEmits<{
  "file-added": [file: FileItem];
  "file-removed": [file: FileItem];
  "upload-progress": [file: FileItem, percentage: number];
  "upload-success": [file: FileItem, result: any];
  "upload-error": [file: FileItem, error: Error];
  "upload-canceled": [file: FileItem];
  "success-action": [file: FileItem, result: any];
}>();

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  percentage: number;
  status: "ready" | "uploading" | "success" | "error" | "canceled" | null;
  uploading: boolean;
  calculatingHash: boolean;
  hashProgress: number;
  hash?: string;
  chunkInfo: {
    current: number;
    total: number;
  } | null;
  errorMessage: string | null;
  result?: any;
}

interface ChunkUploadResponse {
  code: number;
  data?: any;
  message?: string;
}

// 上传函数类型定义
type UploadFunction = (
  formData: FormData,
  signal?: AbortSignal
) => Promise<ChunkUploadResponse>;

// action参数可以是URL字符串或上传函数
type ActionParam = string | UploadFunction | ((formData: FormData, signal?: AbortSignal) => Promise<any>);

const message = useMessage();
const t = useLocalTrans();
const http = useHttp();

const files = ref<FileItem[]>([]);
const abortControllers = new Map<string, AbortController>();
// 获取文件扩展名
function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

// 验证文件类型
function validateFileType(file: File): { valid: boolean; error?: string } {
  // 检查 MIME 类型
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: t("fileTypeNotAllowed", { types: allowedTypes.join(", ") }),
    };
  }

  // 检查文件扩展名
  if (allowedExtensions.length > 0) {
    const extension = getFileExtension(file.name);
    if (!allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: t("fileExtensionNotAllowed", {
          extensions: allowedExtensions.join(", "),
        }),
      };
    }
  }

  return { valid: true };
}

// 计算提示文本
const tipText = computed(() => {
  if (tip) {
    return tip;
  }

  let defaultTip = t("defaultTip", {
    maxSize: formatFileSize(maxFileSize),
    maxFiles,
  });

  // 添加文件类型提示
  const typeInfo = [];
  if (allowedTypes.length > 0) {
    typeInfo.push(`支持类型：${allowedTypes.join(", ")}`);
  }
  if (allowedExtensions.length > 0) {
    typeInfo.push(`支持扩展名：${allowedExtensions.join(", ")}`);
  }

  if (typeInfo.length > 0) {
    defaultTip += `，${typeInfo.join("，")}`;
  }

  return defaultTip;
});

// 计算是否有文件正在上传
const isUploading = computed(() => {
  return files.value.some((file) => file.uploading || file.calculatingHash);
});

// 处理文件选择
function handleFileChange(elementUploadFile: UploadFile) {
  const file = elementUploadFile.raw as UploadRawFile;
  if (!file) {
    return;
  }

  // 检查文件类型
  const typeValidation = validateFileType(file);
  if (!typeValidation.valid) {
    message.error(typeValidation.error!);
    return;
  }

  // 检查文件大小
  if (file.size > maxFileSize) {
    message.error(
      t("fileSizeExceeded", { maxSize: formatFileSize(maxFileSize) })
    );
    return;
  }

  // 检查文件数量
  if (!multiple) {
    // 单文件模式：清除现有文件以支持替换
    if (files.value.length >= 1) {
      files.value = [];
    }
  } else {
    // 多文件模式：检查是否超过最大文件数量
    if (files.value.length >= maxFiles) {
      message.error(t("fileCountExceeded", { maxFiles }));
      return;
    }
  }

  // 创建文件对象
  const fileObj: FileItem = {
    id: generateFileId(),
    file,
    name: file.name,
    size: file.size,
    percentage: 0,
    status: "ready" as const,
    uploading: false,
    calculatingHash: false,
    hashProgress: 0,
    chunkInfo: null,
    errorMessage: null,
  };

  files.value.push(fileObj);
  emit("file-added", fileObj);

  // 如果开启自动上传，立即开始上传
  if (autoUpload) {
    nextTick(() => {
      uploadFile(fileObj);
    });
  }
}

// 生成文件唯一ID
function generateFileId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 格式化文件大小
function formatFileSize(size: number): string {
  if (size < 1024) {
    return `${size} ${t("sizeUnitB")}`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} ${t("sizeUnitKB")}`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} ${t("sizeUnitMB")}`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} ${t("sizeUnitGB")}`;
  }
}

// 计算文件哈希值
function calculateFileHash(fileObj: FileItem): Promise<string | null> {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    const file = fileObj.file;
    const size = file.size;
    const hashChunkSize = 2 * 1024 * 1024; // 2MB per chunk
    let offset = 0;

    const hashIndex = files.value.findIndex(f => f.id === fileObj.id);
    if (hashIndex !== -1) {
      files.value[hashIndex].hashProgress = 0;
    }

    const loadNext = () => {
      const slice = file.slice(offset, offset + hashChunkSize);
      reader.readAsArrayBuffer(slice);
    };

    reader.onload = (e) => {
      if (e.target?.result) {
        spark.append(e.target.result as ArrayBuffer);
        offset += hashChunkSize;
        const progressIndex = files.value.findIndex(f => f.id === fileObj.id);
        if (progressIndex !== -1) {
          files.value[progressIndex].hashProgress = Math.min(100, Math.round((offset / size) * 100));
        }

        if (offset < size) {
          loadNext();
        } else {
          resolve(spark.end());
        }
      } else {
        resolve(null);
      }
    };

    reader.onerror = () => {
      resolve(null);
    };

    loadNext();
  });
}

// 上传文件
async function uploadFile(fileObj: FileItem) {
  const file = fileObj.file;
  const fileId = fileObj.id;
  const totalChunks = Math.ceil(file.size / chunkSize);

  const fileIndex = files.value.findIndex(f => f.id === fileObj.id);
  if (fileIndex !== -1) {
    files.value[fileIndex].uploading = true;
    files.value[fileIndex].status = "uploading";
    files.value[fileIndex].errorMessage = null;
    files.value[fileIndex].percentage = 0;
  }

  try {
    // 计算文件哈希值
    const fileIndex1 = files.value.findIndex(f => f.id === fileObj.id);
    if (fileIndex1 !== -1) {
      files.value[fileIndex1].calculatingHash = true;
    }
    fileObj.hash = await calculateFileHash(fileObj);
    const fileIndex2 = files.value.findIndex(f => f.id === fileObj.id);
    if (fileIndex2 !== -1) {
      files.value[fileIndex2].calculatingHash = false;
    }

    if (!fileObj.hash) {
      throw new Error(t("hashCalculationFailed"));
    }

    fileObj.hash = fileObj.hash as string; // 确保类型安全

    // 创建取消控制器
    const abortController = new AbortController();
    abortControllers.set(fileId, abortController);

    // 并发上传分片
    await uploadChunksWithConcurrency(
      fileObj,
      totalChunks,
      abortController.signal
    );

    const successIndex = files.value.findIndex(f => f.id === fileObj.id);
    if (successIndex !== -1) {
      files.value[successIndex].uploading = false;
      files.value[successIndex].status = "success";
      files.value[successIndex].percentage = 100;
    }
    
    // 触发upload-success事件，传递完整的文件信息和结果
    emit('upload-success', fileObj, fileObj.result)
    
    // 自动触发success-action事件
    const autoEventData = {
      ...fileObj.result,
      manual: false,
      actionType: 'auto',
      uploadTime: new Date().toISOString(),
      fileInfo: {
        name: fileObj.name,
        size: fileObj.size,
        type: fileObj.file.type
      }
    }
    emit('success-action', fileObj, autoEventData)
    
    // 调试日志
    if (process.env.NODE_ENV === 'development') {
      console.log('[MaUploadChunk] Events emitted:', {
        'upload-success': { fileObj, result: fileObj.result },
        'success-action': { fileObj, eventData: autoEventData }
      })
    }
    
    message.success(t('uploadSuccess'))
  } catch (error: any) {
    const errorIndex = files.value.findIndex(f => f.id === fileObj.id);
    if (errorIndex !== -1) {
      files.value[errorIndex].uploading = false;
      if (error.name === "AbortError" || error.message === t("uploadCanceled")) {
        files.value[errorIndex].status = "canceled";
        files.value[errorIndex].percentage = 0;
        files.value[errorIndex].chunkInfo = null;
        emit("upload-canceled", fileObj);
        message.info(t("uploadCanceled"));
      } else {
        files.value[errorIndex].status = "error";
        files.value[errorIndex].errorMessage = error.message || t("chunkUploadFailed");
        emit("upload-error", fileObj, error);
        message.error(files.value[errorIndex].errorMessage);
      }
    }
  } finally {
    abortControllers.delete(fileId);
  }
}

// 并发上传分片
async function uploadChunksWithConcurrency(
  fileObj: FileItem,
  totalChunks: number,
  signal: AbortSignal
): Promise<void> {
  const file = fileObj.file;
  const uploadedChunks = new Set<number>();
  const chunkQueue: number[] = [];

  // 初始化队列
  for (let i = 0; i < totalChunks; i++) {
    chunkQueue.push(i);
  }

  // 并发上传函数
  const uploadChunkWithRetry = async (chunkIndex: number): Promise<void> => {
    let retries = 0;
    while (retries < retryCount) {
      try {
        if (signal.aborted) {
          throw new Error(t("uploadCanceled"));
        }

        const chunk = file.slice(
          chunkIndex * chunkSize,
          Math.min((chunkIndex + 1) * chunkSize, file.size)
        );

        const result = await uploadChunk(
          fileObj.id,
          chunk,
          chunkIndex,
          totalChunks,
          file.name,
          file.size,
          fileObj.hash!,
          file.type,
          signal
        );

        uploadedChunks.add(chunkIndex);

        // 更新进度
        const newPercentage = Math.round((uploadedChunks.size / totalChunks) * 100);
        
        // 找到文件在数组中的索引并更新
        const fileIndex = files.value.findIndex(f => f.id === fileObj.id);
        if (fileIndex !== -1) {
          files.value[fileIndex].percentage = newPercentage;
          files.value[fileIndex].chunkInfo = {
            current: uploadedChunks.size,
            total: totalChunks,
          };
        }
        
        emit("upload-progress", fileObj, newPercentage);

        // 如果是最后一个分片，保存结果
        if (uploadedChunks.size === totalChunks && result.code === 200) {
          fileObj.result = result.data;
        }
        return;
      } catch (error: any) {
        retries++;
        if (retries >= retryCount || signal.aborted) {
          throw error;
        }
        // 等待一段时间后重试
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      }
    }
  };

  // 创建并发上传Promise
  const promises: Promise<void>[] = [];
  for (let i = 0; i < Math.min(concurrency, totalChunks); i++) {
    promises.push(
      (async () => {
        while (chunkQueue.length > 0 && !signal.aborted) {
          const chunkIndex = chunkQueue.shift();
          if (chunkIndex !== undefined && !uploadedChunks.has(chunkIndex)) {
            await uploadChunkWithRetry(chunkIndex);
          }
        }
      })()
    );
  }

  await Promise.all(promises);

  if (uploadedChunks.size !== totalChunks) {
    throw new Error(
      t("uploadIncomplete", {
        uploaded: uploadedChunks.size,
        total: totalChunks,
      })
    );
  }
}

// 上传单个分片
async function uploadChunk(
  fileId: string,
  chunk: Blob,
  chunkIndex: number,
  totalChunks: number,
  fileName: string,
  fileSize: number,
  fileHash: string,
  fileType: string,
  signal: AbortSignal
): Promise<ChunkUploadResponse> {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("fileId", fileId);
  formData.append("index", (chunkIndex + 1).toString()); // 从1开始
  formData.append("total", totalChunks.toString());
  formData.append("fileName", fileName); // 修改为 fileName
  formData.append("fileSize", fileSize.toString()); // 修改为 fileSize
  formData.append("fileHash", fileHash); // 修改为 fileHash
  formData.append("fileType", fileType); // 修改为 fileType

  // 添加自定义数据
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  // 判断action类型并调用相应的上传方法
  if (typeof action === "function") {
    // 如果action是函数，直接调用
    const response = await action(formData, signal);
    
    // 适配响应格式 - 确保返回正确的结构
    if (response && typeof response.code === 'number') {
      return response;
    }
    
    // 兜底：包装响应格式
    return {
      code: response?.code || 200,
      data: response?.data || response,
      message: response?.message || ''
    };
  } else {
    // 如果action是字符串URL，使用http.post
    const response = await http.post(action, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
      signal,
      timeout: 60000,
    });

    return response.data;
  }
}

// 取消上传
function cancelUpload(fileObj: FileItem) {
  const controller = abortControllers.get(fileObj.id);
  if (controller) {
    controller.abort();
  }
}

// 移除文件
function removeFile(fileObj: FileItem) {
  // 如果正在上传，先取消上传
  if (fileObj.uploading) {
    cancelUpload(fileObj);
  }

  const index = files.value.findIndex((f) => f.id === fileObj.id);
  if (index !== -1) {
    files.value.splice(index, 1);
    emit("file-removed", fileObj);
  }
}

// 处理成功后的手动操作（点击按钮时）
function handleSuccessAction(fileObj: FileItem) {
  // 手动操作时也触发success-action事件，但添加手动标识
  const eventData = { 
    ...fileObj.result, 
    manual: true,
    actionType: 'manual',
    clickTime: new Date().toISOString()
  }
  
  // 调试日志
  if (process.env.NODE_ENV === 'development') {
    console.log('[MaUploadChunk] Manual success-action triggered:', { fileObj, eventData })
  }
  
  emit('success-action', fileObj, eventData)
}

// 清除所有文件
function clearFiles() {
  // 取消所有正在上传的文件
  files.value.forEach((file: FileItem) => {
    if (file.uploading) {
      cancelUpload(file);
    }
  });
  files.value = [];
}

// 批量上传所有文件
function uploadAllFiles() {
  files.value
    .filter(
      (file: FileItem) => file.status === "ready" || file.status === "error"
    )
    .forEach((file: FileItem) => uploadFile(file));
}

// 获取文件列表的方法
function getFiles(): FileItem[] {
  return files.value;
}

function getSuccessFiles(): FileItem[] {
  return files.value.filter((file: FileItem) => file.status === "success");
}

function getUploadingFiles(): FileItem[] {
  return files.value.filter((file: FileItem) => file.uploading);
}

function getFailedFiles(): FileItem[] {
  return files.value.filter((file: FileItem) => file.status === "error");
}

// 获取状态文本
function getStatusText(status: FileItem["status"]): string {
  const statusMap = {
    ready: t("ready"),
    uploading: t("uploading"),
    success: t("uploadSuccess"),
    error: t("uploadFailed"),
    canceled: t("canceled"),
  };
  return status ? statusMap[status] || "" : "";
}

// 获取进度条状态
function getProgressStatus(status: FileItem["status"]) {
  const statusMap = {
    success: "success",
    error: "exception",
    canceled: "warning",
  };
  return status ? statusMap[status] : undefined;
}

// 暴露给父组件的方法
defineExpose({
  clearFiles,
  uploadAllFiles,
  getFiles,
  getSuccessFiles,
  getUploadingFiles,
  getFailedFiles,
  uploadFile,
  cancelUpload,
  removeFile,
});
</script>

<template>
  <div class="chunk-upload-container">
    <!-- 上传区域 -->
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      :on-change="handleFileChange"
      :show-file-list="false"
      :multiple="multiple"
      :accept="accept"
      :disabled="isUploading"
    >
      <el-icon class="el-icon--upload">
        <UploadFilled />
      </el-icon>
      <div class="el-upload__text">
        {{ t("selectFile") }}
      </div>
      <template #tip>
        <div class="el-upload__tip">
          {{ tipText }}
        </div>
      </template>
    </el-upload>

    <!-- 批量操作按钮 -->
    <div v-if="files.length > 0" class="batch-actions">
      <el-button
        v-if="!autoUpload"
        type="primary"
        :disabled="isUploading || files.every((f) => f.status === 'success')"
        @click="uploadAllFiles"
      >
        {{ t("startUpload") }}
      </el-button>
      <el-button type="danger" @click="clearFiles">
        {{ t("removeFile") }}
      </el-button>
    </div>

    <!-- 文件列表 -->
    <div v-if="files.length > 0" class="file-list">
      <div v-for="fileItem in files" :key="fileItem.id" class="file-item">
        <el-card
          :key="`card-${fileItem.id}`"
          :class="[
            'file-card',
            `file-${fileItem.id}`,
            {
              'uploading-file': fileItem.uploading || fileItem.calculatingHash,
              'success-file': fileItem.status === 'success',
              'error-file': fileItem.status === 'error',
            }
          ]"
        >
          <template #header>
            <div class="file-header">
              <div class="file-info">
                <div class="file-name" :title="fileItem.name">
                  {{ fileItem.name }}
                </div>
                <div class="file-meta">
                  <span class="file-size">{{
                    formatFileSize(fileItem.size)
                  }}</span>
                  <span
                    v-if="fileItem.status"
                    class="file-status"
                    :class="`status-${fileItem.status}`"
                  >
                    {{ getStatusText(fileItem.status) }}
                  </span>
                </div>
              </div>
              <div class="file-actions">
                <el-button
                  v-if="
                    !autoUpload
                    && (fileItem.status === 'ready' || fileItem.status === 'error')
                  "
                  type="primary"
                  size="small"
                  :disabled="fileItem.uploading || fileItem.calculatingHash"
                  @click="uploadFile(fileItem)"
                >
                  {{ t("startUpload") }}
                </el-button>
                <el-button
                  v-if="fileItem.uploading"
                  type="warning"
                  size="small"
                  @click="cancelUpload(fileItem)"
                >
                  {{ t("cancelUpload") }}
                </el-button>
                <el-button
                  v-if="fileItem.status === 'success' && showSuccessAction"
                  type="success"
                  size="small"
                  @click="handleSuccessAction(fileItem)"
                >
                  {{ successActionText || t("viewFile") }}
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  @click="removeFile(fileItem)"
                >
                  {{ t("removeFile") }}
                </el-button>
              </div>
            </div>
          </template>

          <div class="progress-container">
            <!-- 哈希计算进度 -->
            <div v-if="fileItem.calculatingHash" class="hash-progress">
              <div class="progress-label">
                {{ t("calculatingHash") }}
              </div>
              <el-progress
                :key="`hash-progress-${fileItem.id}`"
                :percentage="fileItem.hashProgress"
                :show-text="false"
                :stroke-width="6"
              />
            </div>

            <!-- 上传进度 -->
            <div v-if="!fileItem.calculatingHash" class="upload-progress">
              <el-progress
                :key="`upload-progress-${fileItem.id}`"
                :percentage="fileItem.percentage"
                :status="getProgressStatus(fileItem.status)"
                :stroke-width="8"
              />
              <div
                v-if="fileItem.chunkInfo || fileItem.uploading"
                class="progress-info"
              >
                <span v-if="fileItem.chunkInfo">
                  {{ t("chunkProgress", fileItem.chunkInfo) }}
                </span>
                <span v-else-if="fileItem.uploading">
                  {{ t("uploadProgress") }}...
                </span>
              </div>
            </div>

            <!-- 错误信息 -->
            <div v-if="fileItem.errorMessage" class="error-message">
              <el-alert
                :title="fileItem.errorMessage"
                type="error"
                :closable="false"
                show-icon
              />
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chunk-upload-container {
  width: 100%;
}

.batch-actions {
  margin: 16px 0;
  display: flex;
  gap: 8px;
}

.file-list {
  margin-top: 16px;
}

.file-item {
  margin-bottom: 16px;
}

.file-card {
  transition: all 0.3s ease;
}

.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
  word-break: break-all;
  line-height: 1.4;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.file-size {
  color: var(--el-text-color-regular);
}

.file-status {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-ready {
  background-color: var(--el-color-info-light-8);
  color: var(--el-color-info);
}

.status-uploading {
  background-color: var(--el-color-primary-light-8);
  color: var(--el-color-primary);
}

.status-success {
  background-color: var(--el-color-success-light-8);
  color: var(--el-color-success);
}

.status-error {
  background-color: var(--el-color-danger-light-8);
  color: var(--el-color-danger);
}

.status-canceled {
  background-color: var(--el-color-warning-light-8);
  color: var(--el-color-warning);
}

.file-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.progress-container {
  margin-top: 12px;
}

.hash-progress {
  margin-bottom: 12px;
}

.progress-label {
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-bottom: 6px;
}

.progress-info {
  margin-top: 6px;
  font-size: 12px;
  color: var(--el-text-color-regular);
  display: flex;
  justify-content: space-between;
}

.error-message {
  margin-top: 12px;
}

.uploading-file {
  border-left: 3px solid var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.success-file {
  border-left: 3px solid var(--el-color-success);
}

.error-file {
  border-left: 3px solid var(--el-color-danger);
}

.el-upload__text {
  color: var(--el-text-color-regular);
}

.el-upload__text em {
  color: var(--el-color-primary);
  font-style: normal;
}

:deep(.el-card__body) {
  padding: 12px;
}

:deep(.el-card__header) {
  padding: 12px;
}
</style>
