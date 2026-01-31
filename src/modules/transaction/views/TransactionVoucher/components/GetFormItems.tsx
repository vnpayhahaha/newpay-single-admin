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
import type { TransactionVoucherVo } from "~/transaction/api/TransactionVoucher.ts";
import MaDictRadio from "@/components/ma-dict-picker/ma-dict-radio.vue";

export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TransactionVoucherVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    model.transaction_type = 1;
    model.transaction_voucher_type = 1;
  }

  return [
    {
      label: t("transaction_voucher.device_id"),
      prop: "device_id",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        controls: false,
      },
    },
    {
      label: t("transaction_voucher.member_id"),
      prop: "member_id",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        controls: false,
      },
    },
    {
      label: t("transaction_voucher.transaction_type"),
      prop: "transaction_type",
      cols: { md: 12, xs: 24 },
      render: () => MaDictRadio,
      itemProps: {
        required: true,
      },
      renderProps: {
        data: [
          { label: t("enums.transaction_type.collection"), value: 1 },
          { label: t("enums.transaction_type.disbursement"), value: 2 },
        ],
      },
    },
    {
      label: t("transaction_voucher.collection_amount"),
      prop: "collection_amount",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 999999,
        precision: 2,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">INR</span>,
      },
    },
    {
      label: t("transaction_voucher.transaction_voucher_type"),
      prop: "transaction_voucher_type",
      cols: { span: 24 },
      render: () => MaDictRadio,
      itemProps: {
        required: true,
      },
      renderProps: {
        data: [
          { label: t("enums.transaction_voucher_type.utr"), value: 1 },
          { label: t("enums.transaction_voucher_type.order_id"), value: 2 },
          { label: t("enums.transaction_voucher_type.platform_order_no"), value: 3 },
          { label: t("enums.transaction_voucher_type.amount"), value: 4 },
          { label: t("enums.transaction_voucher_type.upstream_order_no"), value: 5 },
        ],
      },
    },
    {
      label: t("transaction_voucher.transaction_voucher"),
      prop: "transaction_voucher",
      hide: () => model.transaction_voucher_type === 4,
      render: () => <el-input class="w-full" />,
      itemProps: {
        rules: [
          {
            required: true,
            validator: (_, value, callback) => {
              if (model.transaction_voucher_type !== 4 && !value) {
                callback(new Error("transaction_voucher is required"));
              } else {
                callback();
              }
            },
          },
        ],
      },
      cols: {
        span: 24,
      },
      renderSlots: {
        prefix: () => (
          <span style="margin-left: 8px">
            {model.transaction_voucher_type === 1
              ? t("enums.transaction_voucher_type.utr")
              : model.transaction_voucher_type === 2
              ? t("enums.transaction_voucher_type.order_id")
              : model.transaction_voucher_type === 3
              ? t("enums.transaction_voucher_type.platform_order_no")
              : model.transaction_voucher_type === 4
              ? t("enums.transaction_voucher_type.amount")
              : model.transaction_voucher_type === 5
              ? t("enums.transaction_voucher_type.upstream_order_no")
              : t("enums.transaction_voucher_type.amount")}
          </span>
        ),
      },
    },
  ];
}
