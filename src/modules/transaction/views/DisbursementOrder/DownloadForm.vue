<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="ts">
import type { DisbursementOrderVo } from "~/transaction/api/DisbursementOrder.ts";

import getFormItems from "./components/GetDownloadFormItems.tsx";
import type { MaFormExpose } from "@mineadmin/form";
import useForm from "@/hooks/useForm.ts";
// downloadBankBill
import { downloadBankBill } from "~/transaction/api/DisbursementOrder.ts";
import tool from "@/utils/tool.ts";
import { useMessage } from "@/hooks/useMessage.ts";

const { data = null } = defineProps<{
  data?: DisbursementOrderVo | null;
}>();

const t = useTrans().globalTrans;
const maFormRef = ref<MaFormExpose>();
const formModel = ref<DisbursementOrderVo>({});

useForm("maFormRef").then((form: MaFormExpose) => {
  if (data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key];
    });
  }
  form.setItems(getFormItems(t, formModel.value));
  form.setOptions({
    labelWidth: "180px",
  });
});
const msg = useMessage();
// 核销操作
// 核销操作
async function downloadHandle(ids: number[]) {
  await downloadBankBill(ids, formModel.value.down_bill_template_id)
    .then((res) => {
      tool.download(res);
      msg.success(t("disbursement_order.downloadBankBillSuccess"));
    })
    .catch(() => {
      msg.error(t("disbursement_order.downloadBankBillError"));
    });
}

defineExpose({
  downloadHandle,
  maForm: maFormRef,
});
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss"></style>
