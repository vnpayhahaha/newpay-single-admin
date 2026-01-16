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
import type { TenantVo } from "~/tenant/api/Tenant.ts";
import { selectStatus } from "@/modules/Common";
import MaDictCheckbox from "@/components/ma-dict-picker/ma-dict-checkbox.vue";

export default function getFormItems(t: any, model: TenantVo): MaFormItem[] {
  model.float_range = model.float_range ?? [0, 0];
  model.notify_range = model.notify_range ?? [0, 0];
  model.upstream_items = model.upstream_items ?? [];
  model.collection_use_method = model.collection_use_method ?? [];

  return [
    {
      label: t("tenant.companyName"),
      prop: "company_name",
      render: () => <el-input disabled />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.is_receipt"),
      prop: "is_receipt",
      render: () => <el-switch />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.settlement_type"),
      prop: "settlement_delay_mode",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(
              selectStatus("transaction_record", "settlement_delay_mode_list")
            )
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.settlement_delay_days"),
      prop: "settlement_delay_days",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.receipt_fee_type"),
      prop: "receipt_fee_type",
      render: () => MaDictCheckbox,
      renderProps: {
        multiple: true,
        data: [
          {
            label: t("tenant.receipt_fixed_fee"),
            value: 1,
          },
          {
            label: t("tenant.receipt_fee_rate"),
            value: 2,
          },
        ],
      },
    },
    {
      label: t("tenant.receipt_fixed_fee"),
      prop: "receipt_fixed_fee",
      hide: () => !model.receipt_fee_type.includes(1),
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
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
      label: t("tenant.receipt_fee_rate"),
      prop: "receipt_fee_rate",
      hide: () => !model.receipt_fee_type.includes(2),
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
        precision: 2,
        step: 0.01,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        suffix: () => <span style="margin-right: 8px">%</span>,
      },
    },
    {
      label: t("tenant.receipt_min_amount"),
      prop: "receipt_min_amount",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
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
      label: t("tenant.receipt_max_amount"),
      prop: "receipt_max_amount",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 99,
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
      label: t("tenant.receipt_settlement_type"),
      prop: "receipt_settlement_type",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("tenant", "settlement_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.float_enabled"),
      prop: "float_enabled",
      render: () => <el-switch />,
      itemProps: {
        required: true,
      },
      cols: {
        span: 12,
      },
    },
    {
      label: t("tenant.float_range"),
      prop: "float_range",
      render: () => (
        <div
          class="w-full"
          style="display: flex; align-items: center; gap: 8px;"
        >
          <el-input-number
            v-model={model.float_range[0]}
            min={-5}
            max={5}
            precision={2}
            step={0.01}
            controls-position="right"
            placeholder={t("common.min")}
            style="flex: 1;"
          />
          <span style="padding: 0 8px;">~</span>
          <el-input-number
            v-model={model.float_range[1]}
            min={-5}
            max={5}
            precision={2}
            step={0.01}
            controls-position="right"
            placeholder={t("common.max")}
            style="flex: 1;"
          />
        </div>
      ),
      itemProps: {
        required: true,
        rules: [
          {
            validator: (_, value, callback) => {
              if (
                value[0] !== undefined &&
                value[1] !== undefined &&
                value[0] > value[1]
              ) {
                callback(new Error(t("validation.rangeInvalid")));
              } else {
                callback();
              }
            },
          },
        ],
      },
      cols: { span: 12 },
    },
    {
      label: t("tenant.notify_range"),
      prop: "notify_range",
      render: () => (
        <div
          class="w-full"
          style="display: flex; align-items: center; gap: 8px;"
        >
          <el-input-number
            v-model={model.notify_range[0]}
            min={-5}
            max={5}
            precision={2}
            step={0.01}
            controls-position="right"
            placeholder={t("common.min")}
            style="flex: 1;"
          />
          <span style="padding: 0 8px;">~</span>
          <el-input-number
            v-model={model.notify_range[1]}
            min={-5}
            max={5}
            precision={2}
            step={0.01}
            controls-position="right"
            placeholder={t("common.max")}
            style="flex: 1;"
          />
        </div>
      ),
      itemProps: {
        required: true,
        rules: [
          {
            validator: (_, value, callback) => {
              if (
                value[0] !== undefined &&
                value[1] !== undefined &&
                value[0] > value[1]
              ) {
                callback(new Error(t("validation.rangeInvalid")));
              } else {
                callback();
              }
            },
          },
        ],
      },
      cols: { span: 12 },
    },
    {
      label: t("tenant.receipt_expire_minutes"),
      prop: "receipt_expire_minutes",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 999,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        suffix: () => <span style="margin-left: 8px">MIN</span>,
      },
    },
    {
      label: t("tenant.reconcile_retain_minutes"),
      prop: "reconcile_retain_minutes",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 9999,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        suffix: () => <span style="margin-left: 8px">MIN</span>,
      },
    },
    {
      label: t("tenant.bill_delay_minutes"),
      prop: "bill_delay_minutes",
      render: () => <el-input-number class="w-full" />,
      itemProps: {
        required: true,
      },
      renderProps: {
        min: 0,
        max: 999,
      },
      cols: {
        span: 12,
      },
      renderSlots: {
        suffix: () => <span style="margin-left: 8px">MIN</span>,
      },
    },
    // {
    //   label: t("tenant.auto_verify_fail_rate"),
    //   prop: "auto_verify_fail_rate",
    //   render: () => <el-input-number class="w-full" />,
    //   itemProps: {
    //     required: true,
    //   },
    //   renderProps: {
    //     min: 0,
    //     max: 100,
    //     precision: 2,
    //     step: 0.01,
    //   },
    //   cols: {
    //     span: 12,
    //   },
    //   renderSlots: {
    //     suffix: () => <span style="margin-left: 8px">%</span>,
    //   },
    // },
    {
      label: t("tenant.cashier_template"),
      prop: "cashier_template",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("tenant", "cashier_template_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
      cols: {
        span: 12,
      },
    },
  ];
}
