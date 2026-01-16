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
import type { TransactionRecordVo } from "~/transaction/api/TransactionRecord.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/TransactionRecord.ts";
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

  const showBtn = (auth: string | string[], row: TransactionRecordVo) => {
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
    {
      label: () => t("transaction_record.failed_msg"),
      prop: "failed_msg",
      width: 80,
      type: "expand",
      cellRender: ({ row }) => {
        return <el-tag>{row.failed_msg}</el-tag>;
      },
    },
    // 普通列
    {
      label: () => t("transaction_record.transaction_no"),
      prop: "transaction_no",
      width: 210,
    },
    {
      label: () => t("transaction_record.account_id"),
      prop: "account_id",
      width: 100,
    },
    {
      label: () => t("transaction_record.transaction_status"),
      prop: "transaction_status",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("transaction_record", "status_list"))
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
      label: () => t("transaction_record.tenant_id"),
      prop: "tenant_id",
      width: 80,
    },
    { label: () => t("transaction_record.amount"), prop: "amount", width: 120 },
    {
      label: () => t("transaction_record.fee_amount"),
      prop: "fee_amount",
      width: 120,
    },
    {
      label: () => t("transaction_record.net_amount"),
      prop: "net_amount",
      width: 120,
    },
    {
      label: () => t("transaction_record.account_type"),
      prop: "account_type",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("tenant_account", "account_type_list"))
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
      label: () => t("transaction_record.transaction_type"),
      prop: "transaction_type",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("transaction_record", "type_list"))
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
      label: () => t("transaction_record.settlement_delay_mode"),
      prop: "settlement_delay_mode",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
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
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("transaction_record.expected_settlement_time"),
      prop: "expected_settlement_time",
      width: 180,
    },
    {
      label: () => t("transaction_record.settlement_delay_days"),
      prop: "settlement_delay_days",
      width: 80,
    },
    {
      label: () => t("transaction_record.holiday_adjustment"),
      prop: "holiday_adjustment",
      width: 80,
    },
    {
      label: () => t("transaction_record.actual_settlement_time"),
      prop: "actual_settlement_time",
      width: 180,
    },
    {
      label: () => t("transaction_record.counterparty"),
      prop: "counterparty",
      width: 120,
    },
    {
      label: () => t("transaction_record.order_no"),
      prop: "order_no",
      width: 180,
    },
    {
      label: () => t("transaction_record.ref_transaction_no"),
      prop: "ref_transaction_no",
    },
    { label: () => t("transaction_record.remark"), prop: "remark" },
    {
      label: () => t("transaction_record.created_at"),
      prop: "created_at",
      width: 180,
    },
    {
      label: () => t("transaction_record.updated_at"),
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
              showBtn("transaction:transaction_record:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:transaction_record:delete", row),
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
