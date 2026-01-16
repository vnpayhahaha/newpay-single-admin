/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from "@mineadmin/pro-table";
import type { TransactionRawDataVo } from "~/transaction/api/TransactionRawData.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/TransactionRawData.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import { selectStatus } from "@/modules/Common";
import MaCopy from "@/components/ma-copy/index.vue";
import item from "@/layouts/components/menu/item";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: TransactionRawDataVo) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    {
      type: "selection",
      showOverflowTooltip: false,
      label: () => t("crud.selection"),
    },
    {
      label: () => t("TransactionRawData.desc"),
      prop: "content",
      type: "expand",
      width: 100,
      cellRender: ({ row }) => {
        let logs = "";
        row.transaction_parsing_log.map((item) => {
          const itemDesc = JSON.parse(item.fail_msg);
          console.log(itemDesc);
          logs +=
            `<p style="color: ${item.status === 2 ? "red" : "green"}">${
              item.created_at
            }   > ${itemDesc[0]}</p>` +
            " " +
            itemDesc[1] +
            "<br>";
        });
        return (
          <>
            <el-tag>{row.content}</el-tag>
            <div class="p-2" v-html={logs} />
          </>
        );
      },
    },
    {
      label: () => t("TransactionRawData.content"),
      prop: "content",
      width: 100,
      hide: true,
    },
    // 索引序号列
    { type: "index" },
    {
      label: () => t("TransactionRawData.channel"),
      prop: "channel",
      type: "merge",
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <el-avatar shape="square" src={row.channel.channel_icon} />
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">
                  {row.channel.channel_code}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.channel.channel_name}
                </el-text>
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("TransactionRawData.channel_id"),
      prop: "channel_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("TransactionRawData.bank_account"),
      prop: "bank_account",
      type: "merge",
      minWidth: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>{row.bank_account.account_holder}</p>
              <p>
                <MaCopy
                  class="color-blue"
                  content={row.bank_account.account_number}
                />
              </p>
              <p> {row.bank_account.branch_name}</p>
              <p>
                <MaCopy
                  class="color-blue"
                  content={row.bank_account.bank_code}
                />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("TransactionRawData.bank_account_id"),
      prop: "bank_account_id",
      width: 100,
      hide: true,
    },
    // 普通列
    { label: () => t("TransactionRawData.hash"), prop: "hash", width: 300 },
    { label: () => t("TransactionRawData.source"), prop: "source", width: 120 },
    {
      label: () => t("TransactionRawData.status"),
      width: 100,
      prop: "status",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("transaction_raw_data", "status_list"))
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value };
            });
          },
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("TransactionRawData.repeat_count"),
      prop: "repeat_count",
      width: 100,
    },
    {
      label: () => t("TransactionRawData.created_at"),
      prop: "created_at",
      width: 180,
    },
    {
      label: () => t("TransactionRawData.updated_at"),
      prop: "updated_at",
      width: 180,
    },

    // 操作列
    {
      type: "operation",
      hide: true,
      label: () => t("crud.operation"),
      width: "260px",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("transaction:transaction_raw_data:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:transaction_raw_data:delete", row),
            icon: "i-heroicons:trash",
            text: () => t("crud.delete"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t("crud.delDataMessage")).then(async () => {
                const response = await deleteByIds([row.id]);
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t("crud.delSuccess"));
                  await proxy.refresh();
                }
              });
            },
          },
        ],
      },
    },
  ];
}
