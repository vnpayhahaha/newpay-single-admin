/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from "@mineadmin/search";
import { selectStatus } from "@/modules/Common";
import { TenantDictVo, remote as tenantRemote } from "~/tenant/api/Tenant.ts";

export default function getSearchItems(
  t: any,
  hideStatus: boolean = false,
): MaSearchItem[] {
  const searchItems: MaSearchItem[] = [
    {
      label: () => t("disbursement_order.platform_order_no"),
      prop: "platform_order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.platform_order_no"),
      },
    },
    {
      label: () => t("disbursement_order.tenant_order_no"),
      prop: "tenant_order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.tenant_order_no"),
      },
    },
    {
      label: () => t("disbursement_order.tenant_id"),
      prop: "tenant_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () => new Promise((resolve) => resolve(tenantRemote())),
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
      label: () => t("disbursement_order.app_id"),
      prop: "app_id",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.app_id"),
      },
    },
    {
      label: () => t("disbursement_order.device_id"),
      prop: "device_id",
      render: () => <el-input type="number" />,
      renderProps: {
        placeholder: t("disbursement_order.device_id"),
      },
    },
    {
      label: () => t("disbursement_order.member_id"),
      prop: "member_id",
      render: () => <el-input type="number" />,
      renderProps: {
        placeholder: t("disbursement_order.member_id"),
      },
    },
    {
      label: () => t("disbursement_order.created_at"),
      prop: "created_at",
      render: () => <el-date-picker />,
      renderProps: {
        type: "datetimerange",
        rangeSeparator: "~",
        startPlaceholder: t("common.startTime"),
        endPlaceholder: t("common.endTime"),
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        name: [t("disbursement_order.created_at")],
      },
    },
    {
      label: () => t("disbursement_order.pay_time"),
      prop: "pay_time",
      render: () => <el-date-picker />,
      renderProps: {
        type: "datetimerange",
        rangeSeparator: "~",
        startPlaceholder: t("common.startTime"),
        endPlaceholder: t("common.endTime"),
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        name: [t("disbursement_order.pay_time")],
      },
    },
    {
      label: () => t("disbursement_order.expire_time"),
      prop: "expire_time",
      render: () => <el-date-picker />,
      renderProps: {
        type: "datetimerange",
        rangeSeparator: "~",
        startPlaceholder: t("common.startTime"),
        endPlaceholder: t("common.endTime"),
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        name: [t("disbursement_order.expire_time")],
      },
    },
    {
      label: () => t("disbursement_order.order_source"),
      prop: "order_source",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.order_source"),
      },
    },
    {
      label: () => t("disbursement_order.payment_type"),
      prop: "payment_type",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("disbursement_order", "payment_type_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("disbursement_order.payment_type"),
      },
    },
    {
      label: () => t("disbursement_order.notify_status"),
      prop: "notify_status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("disbursement_order", "notify_status_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("disbursement_order.notify_status"),
      },
    },
    {
      label: () => t("disbursement_order.payee_bank_name"),
      prop: "payee_bank_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.payee_bank_name"),
      },
    },
    {
      label: () => t("disbursement_order.payee_bank_code"),
      prop: "payee_bank_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.payee_bank_code"),
      },
    },
    {
      label: () => t("disbursement_order.payee_account_name"),
      prop: "payee_account_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.payee_account_name"),
      },
    },
    {
      label: () => t("disbursement_order.payee_account_no"),
      prop: "payee_account_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.payee_account_no"),
      },
    },
    {
      label: () => t("disbursement_order.payee_upi"),
      prop: "payee_upi",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.payee_upi"),
      },
    },
    {
      label: () => t("disbursement_order.utr"),
      prop: "utr",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.utr"),
      },
    },
    {
      label: () => t("disbursement_order.platform_transaction_no"),
      prop: "platform_transaction_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.platform_transaction_no"),
      },
    },
    {
      label: () => t("disbursement_order.request_id"),
      prop: "request_id",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("disbursement_order.request_id"),
      },
    },
  ];
  if (!hideStatus) {
    searchItems.push({
      label: () => t("disbursement_order.status"),
      prop: "status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("disbursement_order", "status_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
    });
  }
  return searchItems;
}
