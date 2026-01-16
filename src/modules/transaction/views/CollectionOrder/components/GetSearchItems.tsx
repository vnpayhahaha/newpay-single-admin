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
import { ChannelDictVo, remote } from "~/channel/api/Channel.ts";
import {
  BankAccountDictVo,
  remote as bankAccountRemote,
} from "~/channel/api/BankAccount.ts";
import {
  ChannelAccountDictVo,
  remote as channelAccountRemote,
} from "~/channel/api/ChannelAccount.ts";
import { TenantDictVo, remote as tenantRemote } from "~/tenant/api/Tenant.ts";
export default function getSearchItems(
  t: any,
  hideStatus: boolean = false
): MaSearchItem[] {
  const searchItems: MaSearchItem[] = [
    {
      label: () => t("collection_order.platform_order_no"),
      prop: "platform_order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.platform_order_no"),
      },
    },
    {
      label: () => t("collection_order.tenant_order_no"),
      prop: "tenant_order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.tenant_order_no"),
      },
    },
    {
      label: () => t("collection_order.upstream_order_no"),
      prop: "upstream_order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.upstream_order_no"),
      },
    },
    {
      label: () => t("collection_order.settlement_type"),
      prop: "settlement_type",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("collection_order", "settlement_type_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("collection_order.settlement_type"),
      },
    },
    {
      label: () => t("collection_order.collection_type"),
      prop: "collection_type",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("collection_order", "collection_type_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("collection_order.collection_type"),
      },
    },
    {
      label: () => t("collection_order.collection_channel_id"),
      prop: "collection_channel_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) => resolve(remote({ support_collection: 1 }))),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
        placeholder: t("collection_order.collection_channel_id"),
      },
    },
    {
      label: () => t("collection_order.bank_account"),
      prop: "bank_account_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(bankAccountRemote({ support_collection: 1 }))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: BankAccountDictVo) => {
            return {
              label: `${item.account_holder} [${item.account_number}]`,
              value: item.id,
            };
          });
        },
        placeholder: t("collection_order.bank_account"),
      },
    },
    {
      label: () => t("collection_order.channel_account"),
      prop: "channel_account_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(channelAccountRemote({ support_collection: 1 }))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelAccountDictVo) => {
            return { label: `${item.merchant_id}`, value: item.id };
          });
        },
        placeholder: t("collection_order.channel_account"),
      },
    },
    {
      label: () => t("collection_order.created_at"),
      prop: "created_at",
      render: () => <el-date-picker />,
      renderProps: {
        type: "datetimerange",
        rangeSeparator: "~",
        startPlaceholder: t("common.startTime"),
        endPlaceholder: t("common.endTime"),
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        name: [t("collection_order.created_at")],
      },
    },
    {
      label: () => t("collection_order.pay_time"),
      prop: "pay_time",
      render: () => <el-date-picker />,
      renderProps: {
        type: "datetimerange",
        rangeSeparator: "~",
        startPlaceholder: t("common.startTime"),
        endPlaceholder: t("common.endTime"),
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        name: [t("collection_order.pay_time")],
      },
    },
    {
      label: () => t("collection_order.expire_time"),
      prop: "expire_time",
      render: () => <el-date-picker />,
      renderProps: {
        type: "datetimerange",
        rangeSeparator: "~",
        startPlaceholder: t("common.startTime"),
        endPlaceholder: t("common.endTime"),
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        name: [t("collection_order.expire_time")],
      },
    },
    {
      label: () => t("collection_order.order_source"),
      prop: "order_source",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.order_source"),
      },
    },
    {
      label: () => t("collection_order.recon_type"),
      prop: "recon_type",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("collection_order", "recon_type_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("collection_order.recon_type"),
      },
    },
    {
      label: () => t("collection_order.notify_status"),
      prop: "notify_status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("collection_order", "notify_status_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("collection_order.notify_status"),
      },
    },
    {
      label: () => t("collection_order.tenant_id"),
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
      label: () => t("collection_order.app_id"),
      prop: "app_id",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.app_id"),
      },
    },
    {
      label: () => t("collection_order.payer_name"),
      prop: "payer_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.payer_name"),
      },
    },
    {
      label: () => t("collection_order.payer_account"),
      prop: "payer_account",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.payer_account"),
      },
    },
    {
      label: () => t("collection_order.payer_bank"),
      prop: "payer_bank",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.payer_bank"),
      },
    },
    {
      label: () => t("collection_order.payer_ifsc"),
      prop: "payer_ifsc",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.payer_ifsc"),
      },
    },
    {
      label: () => t("collection_order.payer_upi"),
      prop: "payer_upi",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.payer_upi"),
      },
    },
    // {
    //   label: () => t("collection_order.status"),
    //   prop: "status",
    //   render: () => <el-input />,
    //   renderProps: {
    //     placeholder: t("collection_order.status"),
    //   },
    // },
    {
      label: () => t("collection_order.channel_transaction_no"),
      prop: "channel_transaction_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.channel_transaction_no"),
      },
    },
    {
      label: () => t("collection_order.request_id"),
      prop: "request_id",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.request_id"),
      },
    },
    {
      label: () => t("collection_order.platform_transaction_no"),
      prop: "platform_transaction_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.platform_transaction_no"),
      },
    },
    {
      label: () => t("collection_order.utr"),
      prop: "utr",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.utr"),
      },
    },
    {
      label: () => t("collection_order.customer_submitted_utr"),
      prop: "customer_submitted_utr",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("collection_order.customer_submitted_utr"),
      },
    },
  ];
  if (!hideStatus) {
    searchItems.push({
      label: () => t("collection_order.status"),
      prop: "status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("collection_order", "status_list"))
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
