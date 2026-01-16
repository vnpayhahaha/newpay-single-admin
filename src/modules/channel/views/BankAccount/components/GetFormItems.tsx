/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaFormItem } from "@mineadmin/form";
import type { BankAccountVo } from "~/channel/api/BankAccount.ts";
import type { ChannelDictVo } from "~/channel/api/Channel.ts";
import { remote } from "~/channel/api/Channel.ts";
import { selectStatus } from "@/modules/Common";
import MaKeyValue from "@/components/ma-key-value/index.vue";

export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: BankAccountVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    model.status = true;
    model.support_collection = false;
    model.support_disbursement = false;
    model.limit_quota = 0;
    model.float_amount_enabled = false;
    model.daily_max_receipt = 0;
    model.daily_max_payment = 0;
    model.daily_max_receipt_count = 0;
    model.daily_max_payment_count = 0;
    model.max_receipt_per_txn = 0;
    model.max_payment_per_txn = 0;
    model.min_receipt_per_txn = 0;
    model.min_payment_per_txn = 0;
    model.security_level = 1;
    model.limit_quota = 0;
    model.balance = 0;
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }

  const channelArray = reactive<ChannelDictVo[]>([]);
  const channelChange = (val: string) => {
    console.log("channelArray", channelArray);
    console.log("channelChange", val);
    // model.account_config 赋值等于 遍历channelArray 中id === val 的 channelArray[i].config
    model.account_config =
      channelArray.find((item) => item.id === val)?.config || [];
  };

  return [
    {
      label: t("bankAccount.channel_id"),
      prop: "channel_id",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => (
        <ma-remote-select
          filterable
          onChange={channelChange}
          disabled={formType === "edit"}
        />
      ),
      renderProps: {
        api: () =>
          new Promise((resolve) => resolve(remote({ channel_type: 1 }))),
        dataHandle: (response: any) => {
          channelArray.splice(0, channelArray.length, ...response.data);
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("bankAccount.bank_code"),
      prop: "bank_code",
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t("bankAccount.branch_name"),
      prop: "branch_name",
      cols: { md: 24, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t("bankAccount.account_holder"),
      prop: "account_holder",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input />,
    },
    {
      label: t("bankAccount.balance"),
      prop: "balance",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.account_number"),
      prop: "account_number",
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t("bankAccount.upi_id"),
      prop: "upi_id",
      cols: { md: 12, xs: 24 },
      render: () => <el-input />,
    },
    {
      label: t("bankAccount.float_amount_enabled"),
      prop: "float_amount_enabled",
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t("bankAccount.status"),
      prop: "status",
      cols: { md: 12, xs: 24 },
      render: () => <el-switch />,
    },
    {
      label: t("bankAccount.daily_max_receipt"),
      prop: "daily_max_receipt",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.daily_max_payment"),
      prop: "daily_max_payment",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.daily_max_receipt_count"),
      prop: "daily_max_receipt_count",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.daily_max_payment_count"),
      prop: "daily_max_payment_count",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.max_receipt_per_txn"),
      prop: "max_receipt_per_txn",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.max_payment_per_txn"),
      prop: "max_payment_per_txn",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.min_receipt_per_txn"),
      prop: "min_receipt_per_txn",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.min_payment_per_txn"),
      prop: "min_payment_per_txn",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.support_collection"),
      prop: "support_collection",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-switch />,
    },
    {
      label: t("bankAccount.support_disbursement"),
      prop: "support_disbursement",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-switch />,
    },
    {
      label: t("bankAccount.limit_quota"),
      prop: "limit_quota",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.security_level"),
      prop: "security_level",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <el-input-number min={0} max={99} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.used_quota"),
      prop: "used_quota",
      cols: { md: 12, xs: 24 },
      render: () => <el-input-number min={0} max={9999999999} precision={2} />,
      renderProps: {
        class: "w-full",
      },
    },
    {
      label: t("bankAccount.down_bill_template_id"),
      prop: "down_bill_template_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("disbursement_order", "bill_template_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        multiple: true,
      },
    },
    {
      label: t("bankAccount.account_config"),
      prop: "account_config",
      render: () => MaKeyValue,
      renderProps: {
        fixedKey: true,
      },
    },
  ];
}
