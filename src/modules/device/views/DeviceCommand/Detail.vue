<script setup lang="ts">
import type { DeviceCommandVo, DeviceCommandResultVo } from "~/device/api/DeviceCommand.ts";
import type { TransType } from "@/hooks/auto-imports/useTrans.ts";

import { detail } from "~/device/api/DeviceCommand.ts";

defineOptions({ name: "DeviceCommandDetail" });

const props = defineProps<{
  data: DeviceCommandVo;
}>();

const i18n = useTrans() as TransType;
const t = i18n.globalTrans;

const loading = ref(false);
const commandData = ref<DeviceCommandVo | null>(null);
const resultList = ref<DeviceCommandResultVo[]>([]);

// 指令类型映射
const commandTypeMap: Record<number, string> = {
  1: t("device_command.command_type_options.1"),
  2: t("device_command.command_type_options.2"),
  3: t("device_command.command_type_options.3"),
  4: t("device_command.command_type_options.4"),
};

// 业务类型映射
const businessTypeMap: Record<number, string> = {
  1: t("device_command.business_type_options.1"),
  2: t("device_command.business_type_options.2"),
};

// 状态映射
const statusMap: Record<number, { label: string; type: string }> = {
  1: { label: t("device_command.status_options.1"), type: "info" },
  2: { label: t("device_command.status_options.2"), type: "warning" },
  3: { label: t("device_command.status_options.3"), type: "primary" },
  4: { label: t("device_command.status_options.4"), type: "success" },
  5: { label: t("device_command.status_options.5"), type: "danger" },
  6: { label: t("device_command.status_options.6"), type: "warning" },
  7: { label: t("device_command.status_options.7"), type: "info" },
};

// 结果类型映射
const resultTypeMap: Record<number, { label: string; type: string }> = {
  1: { label: t("device_command_result.result_type_options.1"), type: "success" },
  2: { label: t("device_command_result.result_type_options.2"), type: "danger" },
  3: { label: t("device_command_result.result_type_options.3"), type: "warning" },
  4: { label: t("device_command_result.result_type_options.4"), type: "info" },
};

// 加载详情
const loadDetail = async () => {
  if (!props.data?.id) return;
  loading.value = true;
  try {
    const response = await detail(props.data.id);
    if (response.code === 200) {
      commandData.value = response.data.command;
      resultList.value = response.data.results || [];
    }
  } finally {
    loading.value = false;
  }
};

// 格式化 JSON 数据
const formatJson = (data: any) => {
  if (!data) return "-";
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
};

onMounted(() => {
  loadDetail();
});
</script>

<template>
  <div v-loading="loading" class="p-4">
    <!-- 指令基本信息 -->
    <el-descriptions :title="t('device_command.index')" :column="2" border>
      <el-descriptions-item :label="t('device_command.command_no')">
        <el-text type="primary">{{ commandData?.command_no }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.device_id')">
        {{ commandData?.device_id || "-" }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.command_type')">
        <el-tag>{{ commandTypeMap[commandData?.command_type ?? 0] || "-" }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.business_type')">
        <el-tag v-if="commandData?.business_type">
          {{ businessTypeMap[commandData.business_type] }}
        </el-tag>
        <span v-else>-</span>
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.order_no')">
        {{ commandData?.order_no || "-" }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.status')">
        <el-tag :type="statusMap[commandData?.status ?? 0]?.type as any">
          {{ statusMap[commandData?.status ?? 0]?.label || "-" }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.priority')">
        {{ commandData?.priority }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.retry_count')">
        {{ commandData?.retry_count }} / {{ commandData?.max_retry }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.timeout_seconds')">
        {{ commandData?.timeout_seconds }}s
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.created_at')">
        {{ commandData?.created_at }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.sent_at')">
        {{ commandData?.sent_at || "-" }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('device_command.completed_at')">
        {{ commandData?.completed_at || "-" }}
      </el-descriptions-item>
      <el-descriptions-item v-if="commandData?.error_code" :label="t('device_command.error_code')" :span="2">
        <el-text type="danger">{{ commandData.error_code }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item v-if="commandData?.error_message" :label="t('device_command.error_message')" :span="2">
        <el-text type="danger">{{ commandData.error_message }}</el-text>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 指令数据 -->
    <el-divider />
    <h4 class="mb-2">{{ t("device_command.command_data") }}</h4>
    <el-input
      type="textarea"
      :model-value="formatJson(commandData?.command_data)"
      :rows="6"
      readonly
      class="font-mono"
    />

    <!-- 执行结果列表 -->
    <el-divider />
    <h4 class="mb-2">{{ t("device_command.result_list") }}</h4>
    
    <el-empty v-if="resultList.length === 0" :description="t('device_command.no_result')" />
    
    <el-timeline v-else>
      <el-timeline-item
        v-for="result in resultList"
        :key="result.id"
        :type="resultTypeMap[result.result_type]?.type as any"
        :timestamp="result.created_at"
        placement="top"
      >
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between items-center">
              <el-tag :type="resultTypeMap[result.result_type]?.type as any">
                {{ resultTypeMap[result.result_type]?.label }}
              </el-tag>
              <el-text type="info" size="small">
                {{ t("device_command_result.execution_time") }}: {{ result.execution_time || 0 }}ms
              </el-text>
            </div>
          </template>
          
          <el-descriptions :column="2" size="small" border>
            <el-descriptions-item :label="t('device_command_result.result_no')">
              {{ result.result_no }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('device_command_result.device_id')">
              {{ result.device_id || "-" }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('device_command_result.result_code')">
              {{ result.result_code || "-" }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('device_command_result.result_message')">
              {{ result.result_message || "-" }}
            </el-descriptions-item>
            <el-descriptions-item v-if="result.utr" :label="t('device_command_result.utr')">
              <el-text type="success">{{ result.utr }}</el-text>
            </el-descriptions-item>
            <el-descriptions-item v-if="result.paid_amount" :label="t('device_command_result.paid_amount')">
              {{ result.paid_amount }}
            </el-descriptions-item>
            <el-descriptions-item v-if="result.screenshot_url" :label="t('device_command_result.screenshot_url')" :span="2">
              <el-link :href="result.screenshot_url" target="_blank" type="primary">
                {{ result.screenshot_url }}
              </el-link>
            </el-descriptions-item>
          </el-descriptions>
          
          <div v-if="result.result_data" class="mt-2">
            <el-text type="info" size="small">{{ t("device_command_result.result_data") }}:</el-text>
            <el-input
              type="textarea"
              :model-value="formatJson(result.result_data)"
              :rows="3"
              readonly
              class="font-mono mt-1"
            />
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: monospace;
}
</style>
