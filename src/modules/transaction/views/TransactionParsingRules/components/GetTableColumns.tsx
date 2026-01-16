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
import type { TransactionParsingRulesVo } from "~/transaction/api/TransactionParsingRules.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import {
  deleteByIds,
  save,
} from "~/transaction/api/TransactionParsingRules.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: TransactionParsingRulesVo) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    {
      type: "selection",
      showOverflowTooltip: false,
      label: () => t("crud.selection"),
    },
    // 索引序号列
    // { type: "index" },
    {
      label: () => t("TransactionParsingRules.example_data"),
      width: 90,
      type: "expand",
      prop: "example_data",
      cellRender: ({ row }) => {
        return row.example_data;
      },
    },
    // 普通列
    {
      label: () => t("TransactionParsingRules.channel"),
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
      label: () => t("TransactionParsingRules.channel_id"),
      hide: true,
      prop: "channel_id",
    },
    {
      label: () => t("TransactionParsingRules.regex"),
      minWidth: 300,
      prop: "regex",
    },
    {
      label: () => t("TransactionParsingRules.variable_name"),
      prop: "variable_name",
      width: 240,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            {Array.isArray(row.variable_name) ? (
              row.variable_name.map((name, index) => (
                <el-tag key={index} size="small">
                  {name}
                </el-tag>
              ))
            ) : (
              <el-tag size="small">{row.variable_name}</el-tag>
            )}
          </div>
        );
      },
    },

    {
      label: () => t("TransactionParsingRules.status"),
      prop: "status",
      width: 80,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "switch",
          prop: "status",
          props: {
            size: "small",
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log("value", value);
                save(row.id, {
                  ...row,
                  status: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t("crud.updateSuccess"));
                    proxy.refresh();
                  } else {
                    msg.error(t("crud.updateError"));
                  }
                });
              },
            },
          },
        },
      },
    },
    {
      label: () => t("TransactionParsingRules.created_at"),
      width: 180,
      prop: "created_at",
    },
    {
      label: () => t("TransactionParsingRules.updated_at"),
      width: 180,
      prop: "updated_at",
    },
    {
      label: () => t("TransactionParsingRules.deleted_at"),
      hide: true,
      width: 180,
      prop: "deleted_at",
    },

    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "200px",
      fixed: "right",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("transaction:transaction_parsing_rules:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:transaction_parsing_rules:delete", row),
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
