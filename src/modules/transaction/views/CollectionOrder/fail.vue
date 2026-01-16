<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="tsx">
import type {
  MaProTableExpose,
  MaProTableOptions,
  MaProTableSchema,
} from "@mineadmin/pro-table";
import type { Ref } from "vue";
import type { TransType } from "@/hooks/auto-imports/useTrans";
import type { UseDialogExpose } from "@/hooks/useDialog";
import type { CollectionOrderVoDataVo } from "~/transaction/api/CollectionOrder";
import tool from "@/utils/tool";

import { page } from "~/transaction/api/CollectionOrder";
import getSearchItems from "./components/GetSearchItems";
import getTableColumns from "./components/GetTableColumns";
import useDialog from "@/hooks/useDialog";
import { useMessage } from "@/hooks/useMessage";
import { ResultCode } from "@/utils/ResultCode";

import WriteOffForm from "./WriteOffForm.vue";

defineOptions({ name: "transaction:collection_order" });

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>;
const writeOffFormRef = ref();
const setFormRef = ref();
const selections = ref<any[]>([]);
const i18n = useTrans() as TransType;
const t = i18n.globalTrans;
const local = i18n.localTrans;
const msg = useMessage();

// 弹窗配置
const writeOffDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true);
    const elForm = writeOffFormRef.value.maForm.getElFormRef();
    // 验证通过后
    elForm
      .validate()
      .then(() => {
        writeOffFormRef.value
          .writeOffHandle()
          .then((res: any) => {
            res.code === 200
              ? msg.success(t("crud.updateSuccess"))
              : msg.error(res.message);
            writeOffDialog.close();
            proTableRef.value.refresh();
          })
          .catch((err: any) => {
            msg.alertError(err.response.data?.message);
          }).finally(() => {
            okLoadingState(false)
          })
      })
      .catch().finally(() => {
            okLoadingState(false)
          })
  },
});

const responseTableData = ref<CollectionOrderVoDataVo>({
  list: [],
  total: 0,
  order_amount: '0.00',
  payable_amount: '0.00',
  paid_amount: '0.00',
});

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t("collection_order.index"),
    subTitle: () => t('collection_order.status_labels.40'),
  },
  // 表格参数
  tableOptions: {
    on: {
      // 表格选择事件
      onSelectionChange: (selection: any[]) => (selections.value = selection),
    },
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
  searchFormOptions: { labelWidth: "150px" },
  // 请求配置
  requestOptions: {
    api: page,
    requestParams: {
      orderBy: "id",
      orderType: "desc",
      status: 40,
    },
    responseDataHandler: (response: Record<string, any>) => {
      const data = response as CollectionOrderVoDataVo;
      responseTableData.value = data;
      return data.list;
    },
  },
});
// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t, true),
  // 表格列
  tableColumns: getTableColumns(writeOffDialog, writeOffFormRef, t),
});

const middleStatisticsHtml = computed(() => {
  const formatValue = (label: string, value: string | number, color?: string) => {
    return `<span style="color: ${color ?? '#666'};">${label}: ${value}</span>`;
  };

  return `
    | ${t("collection_order.query_total")}: ${responseTableData.value.total}
    | ${formatValue(t("collection_order.query_order_amount"), tool.formatMoney(responseTableData.value.order_amount), '#409EFF')}
    | ${formatValue(t("collection_order.query_payable_amount"), tool.formatMoney(responseTableData.value.payable_amount), '#4ade80')}
  `;
});
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #middle>
        <div style="padding: 15px 10px 5px 15px;" v-html="middleStatisticsHtml"></div>
      </template>
      <template #toolbarLeft>
        <NmSearch :proxy="proTableRef" :row="2" />
      </template>
    </MaProTable>

    <component :is="writeOffDialog.Dialog">
      <template #default="{ data }">
        <!-- 新增、编辑表单 -->
        <WriteOffForm ref="writeOffFormRef" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
