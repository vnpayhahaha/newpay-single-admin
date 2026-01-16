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
import type { TenantAccountRecordVo } from "~/tenant/api/TenantAccountRecord.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/tenant/api/TenantAccountRecord.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";

import { selectStatus } from "@/modules/Common";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: TenantAccountRecordVo) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    {
      type: "selection",
      showOverflowTooltip: false,
      label: () => t("crud.selection"),
      hide: true,
    },
    // 索引序号列
    { type: "index" },
    {
      label: () => t("tenantAccountRecord.transaction_no"),
      prop: "transaction_no",
      width: "230px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "copy",
        },
      },
    },
    // 普通列
    {
      label: () => t("tenantAccountRecord.account_type"),
      prop: "account_id",
      width: "100px",
    },
    {
      label: () => t("tenantAccountRecord.account_type"),
      prop: "account_type",
      width: "90px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          data: [
            {
              label: t("enums.tenantAccount.account_type.collection"),
              value: 1,
              color: "#409EFF",
            },
            {
              label: t("enums.tenantAccount.account_type.payment"),
              value: 2,
              color: "#F56C6C",
            },
          ],
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("tenantAccountRecord.change_type"),
      prop: "change_type",
      width: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("tenant_account_record", "change_type_list"))
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
      label: () => t("tenantAccountRecord.change_amount"),
      prop: "change_amount",
    },
    {
      label: () => t("tenantAccountRecord.balance_available_before"),
      prop: "balance_available_before",
    },
    {
      label: () => t("tenantAccountRecord.balance_available_after"),
      prop: "balance_available_after",
      cellRender: (row: any) => {
        if (
          row.row.balance_available_after === row.row.balance_available_before
        ) {
          return (
            <el-text class="mx-1" size="large">
              {row.row.balance_available_after}
            </el-text>
          );
        }
        return Number(row.row.balance_available_after) >
          Number(row.row.balance_available_before) ? (
          <el-text class="mx-1" type="danger" size="large">
            {row.row.balance_available_after}
          </el-text>
        ) : (
          <el-text class="mx-1" type="success" size="large">
            {row.row.balance_available_after}
          </el-text>
        );
      },
    },
    {
      label: () => t("tenantAccountRecord.balance_frozen_before"),
      prop: "balance_frozen_before",
    },
    {
      label: () => t("tenantAccountRecord.balance_frozen_after"),
      prop: "balance_frozen_after",
      cellRender: (row: any) => {
        if (row.row.balance_frozen_after === row.row.balance_frozen_before) {
          return (
            <el-text class="mx-1" size="large">
              {row.row.balance_frozen_after}
            </el-text>
          );
        }
        return row.row.balance_frozen_after > row.row.balance_frozen_before ? (
          <el-text class="mx-1" type="danger" size="large">
            {row.row.balance_frozen_after}
          </el-text>
        ) : (
          <el-text class="mx-1" type="success" size="large">
            {row.row.balance_frozen_after}
          </el-text>
        );
      },
    },
    {
      label: () => t("tenantAccountRecord.created_at"),
      prop: "created_at",
      width: "180px",
    },
    {
      label: () => t("tenant.tenantId"),
      prop: "tenant_id",
      cellRender: (row: any) => {
        return (
          <div class="text-align-left">
            <p class="cell-ellipsis">{row.row.tenant_id}</p>
            <p>{row.row?.tenant?.company_name}</p>
          </div>
        );
      },
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
              showBtn("tenant:tenant_account_record:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("tenant:tenant_account_record:delete", row),
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
