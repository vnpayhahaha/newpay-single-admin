<script setup lang="tsx">
import type { MaFormExpose } from "@mineadmin/form";

import type { TenantAccountVo } from "~/tenant/api/TenantAccount.ts";
import { selectStatus } from "@/modules/Common";
import type { TenantDictVo } from "~/tenant/api/Tenant.ts";
import { remote } from "~/tenant/api/Tenant.ts";
import { ElInputNumber } from "element-plus";

import useForm from "@/hooks/useForm.ts";

import { ResultCode } from "@/utils/ResultCode.ts";
import { changeBalanceFrozen } from "~/tenant/api/TenantAccount.ts";

const { data = null, formType } = defineProps<{
  data?: TenantAccountVo | null;
  formType: "freeze" | "unfreeze";
}>();
const userStore = useUserStore();
// 使用响应式用户信息
const userInfo = ref({ ...userStore.getUserInfo() });
const t = useTrans().globalTrans;
const changeBalanceFrozenForm = ref<MaFormExpose>();
const balanceFrozenModel = ref<{
  id?: number;
  change_balance: number;
  change_balance_max: number;
  tenant_id?: string;
  account_id?: string;
  account_type?: number;
  balance_available?: string;
  balance_frozen?: string;
  google2f_code?: string;
}>({
  change_balance: 0,
  change_balance_max:
    formType === "unfreeze"
      ? Number(data?.balance_frozen)
      : Number(data?.balance_available),
  tenant_id: data?.tenant_id,
  account_id: data?.account_id,
  account_type: data?.account_type,
  balance_available: data?.balance_available,
  balance_frozen: data?.balance_frozen,
});

onMounted(() => {
  console.log("data", data);
});

useForm("changeBalanceFrozenForm").then(async (form: MaFormExpose) => {
  if (data?.id) {
    balanceFrozenModel.value.id = data.id;
  }

  form.setItems([
    {
      label: t("tenant.tenantId"),
      prop: "tenant_id",
      render: () => <ma-remote-select filterable disabled />,
      renderProps: {
        api: () => new Promise((resolve) => resolve(remote())),
        dataHandle: (response: any) => {
          return response.data?.map((item: TenantDictVo) => {
            return {
              label: `${item.tenant_id} ${item.company_name}`,
              value: item.tenant_id,
            };
          });
        },
      },
    },
    {
      label: t("tenantAccount.account_id"),
      prop: "account_id",
      cols: { md: 12, xs: 24 },
      render: () => <el-input disabled />,
    },
    {
      label: t("tenantAccount.account_type"),
      prop: "account_type",
      cols: { md: 12, xs: 24 },
      render: () => <ma-remote-select filterable disabled />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("tenant_account", "account_type_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
    },
    {
      label: t("tenantAccount.balance_available"),
      prop: "balance_available",
      cols: { md: 12, xs: 24 },
      render: (item) => {
        return (
          <div>
            <ma-svg-icon
              name="i-heroicons:currency-rupee-16-solid"
              size="1.2em"
            />
            <el-text> {item?.formData?.balance_available} </el-text>
            {/* 使用 JSX 条件表达式替代 v-if */}
            {formType === "unfreeze" && (
              <ma-svg-icon
                name="i-heroicons:plus-20-solid"
                size="1.2em"
                color="red"
              />
            )}

            {/* 使用 JSX 条件表达式替代 v-else-if */}
            {formType === "freeze" && (
              <ma-svg-icon
                name="i-heroicons:minus-20-solid"
                size="1.2em"
                color="red"
              />
            )}
            <el-text size="large" type="warning">
              {" "}
              {balanceFrozenModel.value.change_balance}
            </el-text>
          </div>
        );
      },
    },
    {
      label: t("tenantAccount.balance_frozen"),
      prop: "balance_frozen",
      cols: { md: 12, xs: 24 },
      render: (item) => {
        return (
          <div>
            <ma-svg-icon
              name="i-heroicons:currency-rupee-16-solid"
              size="1.2em"
            />
            <el-text> {item?.formData?.balance_frozen} </el-text>
            {/* 使用 JSX 条件表达式替代 v-if */}
            {formType === "freeze" && (
              <ma-svg-icon
                name="i-heroicons:plus-20-solid"
                size="1.2em"
                color="red"
              />
            )}

            {/* 使用 JSX 条件表达式替代 v-else-if */}
            {formType === "unfreeze" && (
              <ma-svg-icon
                name="i-heroicons:minus-20-solid"
                size="1.2em"
                color="red"
              />
            )}
            <el-text size="large" type="warning">
              {" "}
              {balanceFrozenModel.value.change_balance}
            </el-text>
          </div>
        );
      },
    },
    {
      label:
        formType === "freeze"
          ? t("tenantAccount.freeze")
          : t("tenantAccount.unfreeze"),
      prop: "change_balance",
      render: () => ElInputNumber,
      renderProps: {
        min: 0.01,
        max: balanceFrozenModel.value.change_balance_max,
        class: "w-full",
        precision: 2,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
    },
    {
      label: t("google_2f.title"),
      show: () =>
        userInfo.value.is_enabled_google && userInfo.value.is_bind_google,
      prop: "google2f_code",
      render: () => <el-input clearable />,
      itemProps: { required: true },
    },
  ]);
  form.setOptions({
    labelWidth: "150px",
  });
});

function freeze(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (data?.id) {
      changeBalanceFrozen(
        data.id as number,
        balanceFrozenModel.value.change_balance,
        balanceFrozenModel.value.google2f_code
      )
        .then((res: any) => {
          res.code === ResultCode.SUCCESS ? resolve(res) : reject(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

function unfreeze(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (data?.id) {
      changeBalanceFrozen(
        data.id as number,
        -balanceFrozenModel.value.change_balance,
        balanceFrozenModel.value.google2f_code
      )
        .then((res: any) => {
          res.code === ResultCode.SUCCESS ? resolve(res) : reject(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

defineExpose({
  freeze,
  unfreeze,
  maForm: changeBalanceFrozenForm,
});
</script>

<template>
  <ma-form ref="changeBalanceFrozenForm" v-model="balanceFrozenModel" />
</template>

<style scoped lang="scss"></style>
