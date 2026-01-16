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
import type { TransactionVoucherVo } from "~/transaction/api/TransactionVoucher.ts";
import { create, save } from "~/transaction/api/TransactionVoucher.ts";
import getFormItems from "./components/GetFormItems.tsx";
import type { MaFormExpose } from "@mineadmin/form";
import useForm from "@/hooks/useForm.ts";
import { ResultCode } from "@/utils/ResultCode.ts";

const { formType = "add", data = null } = defineProps<{
  formType: "add" | "edit";
  data?: TransactionVoucherVo | null;
}>();

const t = useTrans().globalTrans;
const maFormRef = ref<MaFormExpose>();
const formModel = ref<TransactionVoucherVo>({});

useForm("maFormRef").then((form: MaFormExpose) => {
  if (formType === "edit" && data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key];
    });
  }
  form.setItems(getFormItems(formType, t, formModel.value));
  form.setOptions({
    labelWidth: "150px",
  });
});

// 创建操作
function add(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (formModel.value.transaction_voucher_type === 3) {
      formModel.value.transaction_voucher =
        formModel.value.collection_amount.toString();
    }
    console.log("formModel.value", formModel.value);
    create(formModel.value)
      .then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
}

// 更新操作
function edit(): Promise<any> {
  return new Promise((resolve, reject) => {
    save(formModel.value.id as number, formModel.value)
      .then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
}

defineExpose({
  add,
  edit,
  maForm: maFormRef,
});
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss"></style>
