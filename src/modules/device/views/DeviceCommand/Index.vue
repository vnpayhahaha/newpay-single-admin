<!--
 - 设备指令队列管理页面
-->
<script setup lang="tsx">
import type {
  MaProTableExpose,
  MaProTableOptions,
  MaProTableSchema,
} from "@mineadmin/pro-table";
import type { Ref } from "vue";
import type { TransType } from "@/hooks/auto-imports/useTrans.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { page } from "~/device/api/DeviceCommand.ts";
import getSearchItems from "./components/GetSearchItems.tsx";
import getTableColumns from "./components/GetTableColumns.tsx";
import useDialog from "@/hooks/useDialog.ts";

import Detail from "./Detail.vue";

defineOptions({ name: "device:device_command" });

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>;
const i18n = useTrans() as TransType;
const t = i18n.globalTrans;

// 弹窗配置
const maDialog: UseDialogExpose = useDialog({
  width: "900px",
});

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t("device_command.index"),
  },
  // 表格参数
  tableOptions: {
    rowKey: "id",
  },
  // 搜索参数
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t("crud.search"),
      resetBtn: () => t("crud.reset"),
      isFoldBtn: () => t("crud.searchFold"),
      notFoldBtn: () => t("crud.searchUnFold"),
    },
  },
  // 搜索表单参数
  searchFormOptions: { labelWidth: "120px" },
  // 请求配置
  requestOptions: {
    api: page,
    requestParams: {
      orderBy: "id",
      orderType: "desc",
    },
  },
});

// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t),
  // 表格列
  tableColumns: getTableColumns(maDialog, t),
});
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <!-- 数据为空时 -->
      <template #empty>
        <el-empty :description="t('crud.noData')" />
      </template>
    </MaProTable>

    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <!-- 详情 -->
        <Detail v-if="formType === 'detail'" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
