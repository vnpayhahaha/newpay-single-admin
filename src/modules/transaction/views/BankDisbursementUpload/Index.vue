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

import { page, upload } from "~/transaction/api/BankDisbursementUpload.ts";
import getSearchItems from "./components/GetSearchItems.tsx";
import getTableColumns from "./components/GetTableColumns.tsx";
import useDialog from "@/hooks/useDialog.ts";
import { useMessage } from "@/hooks/useMessage.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import MaUploadChunk from "@/components/ma-upload-chunk/index.vue";

import Form from "./Form.vue";

defineOptions({ name: "transaction:bank_disbursement_upload" });

const route = useRoute();
const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>;
const formRef = ref();
const advancedUploadRef = ref();
const setFormRef = ref();
const selections = ref<any[]>([]);
const i18n = useTrans() as TransType;
const t = i18n.globalTrans;
const local = i18n.localTrans;
const msg = useMessage();

// 弹窗配置
const maDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true);
    if (["add", "edit"].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef();
      // 验证通过后
      elForm
        .validate()
        .then(() => {
          switch (formType) {
            // 新增
            case "add":
              formRef.value
                .add()
                .then((res: any) => {
                  res.code === ResultCode.SUCCESS
                    ? msg.success(t("crud.createSuccess"))
                    : msg.error(res.message);
                  maDialog.close();
                  proTableRef.value.refresh();
                })
                .catch((err: any) => {
                  msg.alertError(err.response.data?.message);
                });
              break;
            // 修改
            case "edit":
              formRef.value
                .edit()
                .then((res: any) => {
                  res.code === 200
                    ? msg.success(t("crud.updateSuccess"))
                    : msg.error(res.message);
                  maDialog.close();
                  proTableRef.value.refresh();
                })
                .catch((err: any) => {
                  msg.alertError(err.response.data?.message);
                });
              break;
          }
        })
        .catch();
    }
    okLoadingState(false);
  },
});

const updateDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true);

    // okLoadingState(false);
  },
});

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t("bank_disbursement_upload.index"),
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
  searchFormOptions: { labelWidth: "160px" },
  // 请求配置
  requestOptions: {
    api: page,
    requestParams: {
      ...(route.query.hash && { hash: route.query.hash }),
    },
    // autoRequest: false,
  },
});

onMounted(() => {
  proTableRef.value.setSearchForm({
    ...proTableRef.value.getSearchForm(),
    hash: route.query.hash,
  });
  // proTableRef.value.requestData();
});

// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t),
  // 表格列
  tableColumns: getTableColumns(maDialog, formRef, t),
});

function onUploadSuccess(file: any, result: any) {
  console.log("上传成功:", file, result);
}

function onSuccessAction(file: any, result: any) {
  console.log("成功操作:", file, result);
}
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #actions>
        <el-button
          v-auth="['transaction:transaction_raw_data:save']"
          type="primary"
          @click="
            () => {
              maDialog.setTitle(t('crud.upload'));
              maDialog.open({ formType: 'add' });
            }
          "
        >
          {{ t("crud.upload") }}
        </el-button>
      </template>
    </MaProTable>
    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <!-- 新增、编辑表单 -->
        <Form ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
    <component :is="updateDialog.Dialog">
      <template #default="{ data }">
        <MaUploadChunk
          ref="advancedUploadRef"
          :action="upload"
          :multiple="true"
          :chunk-size="5 * 1024 * 1024"
          :max-files="2"
          :auto-upload="false"
          :max-file-size="100 * 1024 * 1024"
          :concurrency="5"
          :retry-count="5"
          :allowed-extensions="['csv', 'xls', 'xlsx']"
          :data="data"
          tip="支持大文件上传，最大100MB，仅支持CSV和Excel文件"
          success-action-text="下载"
          @upload-success="onUploadSuccess"
          @success-action="onSuccessAction"
        />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
