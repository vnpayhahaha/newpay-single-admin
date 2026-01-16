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
      label: () => t("bankAccount.channel_id"),
      prop: "channel_id",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) => resolve(remote({ channel_type: 1 }))),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("bank_disbursement_upload.upload_bill_template_id"),
      prop: "upload_bill_template_id",
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
        multiple: false,
      },
    },
    {
      label: () => t("bank_disbursement_upload.parsing_status"),
      prop: "parsing_status",
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(
              selectStatus("bank_disbursement_upload", "parsing_status_list")
            )
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
      },
    },
    {
      label: () => t("bank_disbursement_upload.file_name"),
      prop: "file_name",
      render: () => <el-input clearable />,
    },
    {
      label: () => t("bank_disbursement_upload.hash"),
      prop: "hash",
      render: () => <el-input clearable />,
    },
  ];
}
