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
import type { TransType } from "@/hooks/auto-imports/useTrans.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import type { DisbursementOrderVo } from "~/transaction/api/DisbursementOrder.ts";
import { downloadBankBill, page } from "~/transaction/api/DisbursementOrder.ts";
import getSearchItems from "./components/GetSearchItems.tsx";
import getTableColumns from "./components/GetTableColumns.tsx";
import useDialog from "@/hooks/useDialog.ts";
import { useMessage } from "@/hooks/useMessage.ts";
import { ResultCode } from "@/utils/ResultCode.ts";

import WriteOffForm from "./WriteOffForm.vue";
import DistributeForm from "./DistributeForm.vue";
import SearchBankForm from "./SearchBankForm.vue";
import DownloadForm from "./DownloadForm.vue";
import type { DisbursementOrderDataVo } from '~/transaction/api/DisbursementOrder.ts'
import tool from '@/utils/tool.ts'

defineOptions({ name: "transaction:disbursement_order" });

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>;
const writeOffFormRef = ref();
const distributeFormRef = ref();
const downloadFormRef = ref();
const searchBankFormRef = ref();
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
          });
      })
      .catch();
    okLoadingState(false);
  },
});
const distributeDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true);
    const elForm = distributeFormRef.value.maForm.getElFormRef();
    // 验证通过后
    elForm
      .validate()
      .then(() => {
        distributeFormRef.value
          .distributeHandle()
          .then((res: any) => {
            res.code === 200
              ? msg.success(t("crud.updateSuccess"))
              : msg.error(res.message);
            distributeDialog.close();
            proTableRef.value.refresh();
          })
          .catch((err: any) => {
            msg.alertError(err.response.data?.message);
          });
      })
      .catch();
    okLoadingState(false);
  },
});
const searchBankDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true);
    const elForm = searchBankFormRef.value.maForm.getElFormRef();
    // 验证通过后
    elForm
      .validate()
      .then(() => {
        const selectValue = searchBankFormRef.value.downloadHandle();
        searchBankDialog.close();
        proTableRef.value.search({ ...selectValue });
      })
      .catch();
    okLoadingState(false);
  },
});
const downloadDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true);
    const elForm = downloadFormRef.value.maForm.getElFormRef();
    // 验证通过后
    elForm
      .validate()
      .then(async () => {
        const ids = selections.value.map((item: any) => item.id);
        await downloadFormRef.value.downloadHandle(ids);
        downloadDialog.close();
        proTableRef.value.refresh();
      })
      .catch();
    okLoadingState(false);
  },
});
const responseTableData = ref<DisbursementOrderDataVo>({
  list: [],
  total: 0,
  order_amount: '0.00',
})
// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t("disbursement_order.index"),
    subTitle: () => t("disbursement_order.bankStatement"),
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
      status: 10,
      channel_type: 1,
    },
    autoRequest: false,
    responseDataHandler: (response: Record<string, any>): DisbursementOrderDataVo['list'] => {
      // 类型守卫：确保 response 包含所需字段
      const isValidResponse = (
        response &&
        Array.isArray(response.list) &&
        typeof response.total === 'number' &&
        typeof response.order_amount === 'string'
      )

      if (isValidResponse) {
        responseTableData.value = response as DisbursementOrderDataVo
      } else {
        // 提供默认值以防止运行时错误
        responseTableData.value = {
          list: [],
          total: 0,
          order_amount: '0.00',
        }
      }

      return responseTableData.value.list
    },
  },
});
// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t, true, true),
  // 表格列
  tableColumns: getTableColumns(writeOffDialog, distributeDialog, t, true),
});

// 返回值 Record<string, any> 断言 DisbursementOrderVo
const searchData = computed((): DisbursementOrderVo => {
  return proTableRef.value.getSearchForm() as DisbursementOrderVo;
});

const middleStatisticsHtml = computed(() => {
  const formatValue = (label: string, value: string | number, color?: string) => {
    return `<span style="color: ${color ?? '#666'};">${label}: ${value}</span>`;
  };
  return `
    | ${t("disbursement_order.query_total")}: ${responseTableData.value.total}
    | ${formatValue(t("disbursement_order.query_order_amount"), tool.formatMoney(responseTableData.value.order_amount), '#409EFF')}
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
        <el-button
          v-auth="['transaction:disbursement_order:update']"
          type="primary"
          plain
          :disabled="selections.length < 1"
          @click="
            () => {
              if (
                searchData?.bank_account_id > 0 &&
                searchData?.disbursement_channel_id > 0
              ) {
                downloadDialog.setTitle(t('disbursement_order.download'));
                downloadDialog.open({ t });
              } else {
                msg.warning(
                  t('disbursement_order.downloadBankBillSelectBankAccountMsg')
                );
                searchBankDialog.setTitle(
                  t('bankStatement.select_bank_account')
                );
                searchBankDialog.open({ t });
              }
            }
          "
        >
          {{ t("disbursement_order.download") }}
        </el-button>
        <NmSearch :proxy="proTableRef" :row="2" />
      </template>
      <!-- 数据为空时 -->
      <template #empty>
        <el-empty>
          <el-button
            type="primary"
            @click="
              () => {
                searchBankDialog.setTitle(
                  t('bankStatement.select_bank_account')
                );
                searchBankDialog.open({ t });
              }
            "
          >
            {{ t("bankStatement.select_bank_account") }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <component :is="writeOffDialog.Dialog">
      <template #default="{ data }">
        <!-- 核销表单 -->
        <WriteOffForm ref="writeOffFormRef" :data="data" />
      </template>
    </component>
    <component :is="distributeDialog.Dialog">
      <template #default="{ data }">
        <!-- 分配表单 -->
        <DistributeForm ref="distributeFormRef" :data="data" />
      </template>
    </component>
    <component :is="searchBankDialog.Dialog">
      <template #default="{ data }">
        <!-- download -->
        <SearchBankForm ref="searchBankFormRef" :data="data" />
      </template>
    </component>
    <component :is="downloadDialog.Dialog">
      <template #default>
        <!-- download -->
        <DownloadForm ref="downloadFormRef" :data="searchData" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
