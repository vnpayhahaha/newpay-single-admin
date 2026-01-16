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
import type { ChannelDictVo } from "~/channel/api/Channel.ts";
import { remote } from "~/channel/api/Channel.ts";
import { selectStatus } from "@/modules/Common";

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t("channelAccount.channel_id"),
      prop: "channel_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) => resolve(remote({ channel_type: 2 }))),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: () => t("channelAccount.merchant_id"),
      prop: "merchant_id",
      render: () => <el-input />,
    },
    {
      label: () => t("channelAccount.status"),
      prop: "status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("channel_account", "status_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
    },
    {
      label: () => t("channelAccount.support_collection"),
      prop: "support_collection",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("channel_account", "support_collection_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
    },
    {
      label: () => t("channelAccount.support_disbursement"),
      prop: "support_disbursement",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(
              selectStatus("channel_account", "support_disbursement_list")
            )
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
    },
  ];
}
