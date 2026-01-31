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
import type { TransactionVoucherVo } from "~/transaction/api/TransactionVoucher.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/TransactionVoucher.ts";
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

  const showBtn = (auth: string | string[], row: TransactionVoucherVo) => {
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
    { type: "index" },
    {
      label: () => t("transaction_voucher.content"),
      prop: "content",
      width: 60,
      type: "expand",
      cellRender: ({ row }) => {
        return <el-tag>{row.content}</el-tag>;
      },
    },
    // 普通列
    {
      label: () => t("transaction_voucher.device_id"),
      prop: "device_id",
      width: 100,
    },
    {
      label: () => t("transaction_voucher.member_id"),
      prop: "member_id",
      width: 100,
    },
    {
      label: () => t("transaction_voucher.collection_card_no"),
      prop: "collection_card_no",
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">
                  {row.collection_card_no}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.collection_amount}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.collection_fee}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.collection_time}
                </el-text>
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("transaction_voucher.collection_status"),
      prop: "collection_status",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(
                selectStatus("transaction_voucher", "collection_status_list")
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
      label: () => t("transaction_voucher.collection_source"),
      prop: "collection_source",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(
                selectStatus("transaction_voucher", "collection_source_list")
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
      label: () => t("transaction_voucher.transaction_voucher"),
      width: 160,
      prop: "transaction_voucher",
    },
    {
      label: () => t("transaction_voucher.transaction_voucher_type"),
      prop: "transaction_voucher_type",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(
                selectStatus(
                  "transaction_voucher",
                  "transaction_voucher_type_list"
                )
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
      label: () => t("transaction_voucher.order_no"),
      prop: "order_no",
      width: 220,
    },
    {
      label: () => t("transaction_voucher.operation_admin_id"),
      prop: "operation_admin_id",
    },
    {
      label: () => t("transaction_voucher.created_at"),
      prop: "created_at",
      width: 180,
    },
    {
      label: () => t("transaction_voucher.transaction_type"),
      prop: "transaction_type",
      width: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(
                selectStatus("transaction_voucher", "transaction_type_list")
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

    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "260px",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("transaction:transaction_voucher:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:transaction_voucher:delete", row),
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
