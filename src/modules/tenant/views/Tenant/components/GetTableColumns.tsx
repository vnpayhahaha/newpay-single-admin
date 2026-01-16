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
import type { TenantVo } from "~/tenant/api/Tenant.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import {
  deleteByIds,
  realDelete,
  recovery,
  save,
} from "~/tenant/api/Tenant.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import { selectStatus } from "@/modules/Common";

export default function getTableColumns(
  dialog: UseDialogExpose,
  collectionDialog: UseDialogExpose,
  disbursementDialog: UseDialogExpose,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: TenantVo) => {
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
    // 普通列
    { label: () => t("tenant.tenantId"), prop: "tenant_id", width: "100px" },
    {
      label: () => t("tenant.isEnabled"),
      width: "80px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "switch",
          prop: "is_enabled",
          props: {
            size: "small",
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log("value", value);
                save(row.id, {
                  ...row,
                  is_enabled: value,
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
      label: () => t("tenant.companyName"),
      prop: "company_name",
      minWidth: "180px",
      cellRender: ({ row }) => {
        return (
          <div class="text-align-left">
            <p>
              <el-text type="primary" truncated>
                {row.company_name}
              </el-text>
            </p>
            <p>
              <el-text class="mx-1" type="success">
                {row.contact_user_name}
              </el-text>
            </p>
            <p>
              <el-text class="mx-1" type="info">
                {row.contact_phone}
              </el-text>
            </p>
          </div>
        );
      },
    },
    {
      label: () => t("tenant.settlement_type"),
      prop: "settlement_delay_mode",
      width: "130px",
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
      label: () => t("tenant.auto_transfer"),
      prop: "auto_transfer",
      width: "100px",
      cellRender: ({ row }) => {
        return row.auto_transfer === true ? (
          <el-text class="mx-1" type="success">
            {t("common.boolean.true")}
          </el-text>
        ) : (
          <el-text class="mx-1" type="info">
            {t("common.boolean.false")}
          </el-text>
        );
      },
    },
    {
      label: () => t("tenant.receipt_fee_type"),
      prop: "receipt_fee_type",
      width: "120px",
      cellRender: ({ row }) => {
        // 判断row.receipt_fee_type 个位是否为1
        const isFixed = row.receipt_fee_type % 10 === 1;
        // 判断row.receipt_fee_type 十位是否为1
        const isRate = row.receipt_fee_type % 100 === 1;
        const feeDisplay: JSX.Element[] = [];
        if (isFixed) {
          feeDisplay.push(
            <p>
              <el-text key="fixed" class="mx-1" type="primary">
                ₹{row.receipt_fixed_fee}
              </el-text>
            </p>
          );
        }

        if (isRate) {
          feeDisplay.push(
            <p>
              <el-text key="rate" class="mx-1" type="success">
                {row.receipt_fee_rate}%
              </el-text>
            </p>
          );
        }
        return <div>{feeDisplay}</div>;
      },
    },
    {
      label: () => t("tenant.payment_fee_type"),
      prop: "payment_fee_type",
      width: "120px",
      cellRender: ({ row }) => {
        // 判断row.payment_fee_type 个位是否为1
        const isFixed = row.payment_fee_type % 10 === 1;
        // 判断row.payment_fee_type 十位是否为1
        const isRate = row.payment_fee_type % 100 === 1;
        const feeDisplay: JSX.Element[] = [];
        if (isFixed) {
          feeDisplay.push(
            <p>
              <el-text key="fixed" class="mx-1" type="danger">
                ₹{row.payment_fixed_fee}
              </el-text>
            </p>
          );
        }

        if (isRate) {
          feeDisplay.push(
            <p>
              <el-text key="rate" class="mx-1" type="success">
                {row.payment_fee_rate}%
              </el-text>
            </p>
          );
        }
        return <div>{feeDisplay}</div>;
      },
    },
    {
      label: () => t("tenant.user_num_limit"),
      prop: "user_num_limit",
      width: "100px",
      cellRender: ({ row }) => {
        return row.user_num_limit === -1 ? (
          <el-text class="mx-1" type="info">
            {t("tenant.unlimited")}
          </el-text>
        ) : (
          row.user_num_limit
        );
      },
    },
    {
      label: () => t("tenant.app_num_limit"),
      prop: "app_num_limit",
      width: "100px",
      cellRender: ({ row }) => {
        return row.app_num_limit === -1 ? (
          <el-text class="mx-1" type="info">
            {t("tenant.unlimited")}
          </el-text>
        ) : (
          row.app_num_limit
        );
      },
    },
    {
      label: () => t("tenant.safeLevel"),
      prop: "safe_level",
      width: "100px",
      cellRenderTo: {
        name: "tag",
        props: {},
      },
    },
    {
      label: () => t("tenant.createdBy"),
      width: "180px",
      prop: "created_by",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "user-name",
          dictName: "userDict",
        },
      },
    },

    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "260px",
      fixed: "right",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "collection_edit",
            icon: "i-heroicons:document-currency-rupee-solid",
            show: ({ row }) => showBtn("tenant:tenant:update", row),
            text: () => t("crud.collection.edit"),
            onClick: ({ row }) => {
              collectionDialog.setTitle(t("crud.edit"));
              collectionDialog.open({ data: row });
            },
          },
          {
            name: "disbursement_edit",
            icon: "i-heroicons:document-currency-rupee",
            show: ({ row }) => showBtn("tenant:tenant:update", row),
            text: () => t("crud.disbursement.edit"),
            onClick: ({ row }) => {
              disbursementDialog.setTitle(t("crud.edit"));
              disbursementDialog.open({ data: row });
            },
          },
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("tenant:tenant:update", row) && row.deleted_at === null,
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "recovery",
            icon: "i-heroicons:arrow-left-start-on-rectangle",
            show: ({ row }) =>
              showBtn("tenant:tenant:recovery", row) && row.deleted_at !== null,
            text: () => t("crud.restore"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t("crud.restoreMessage")).then(async () => {
                const response = await recovery([row.id]);
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t("crud.restoreSuccess"));
                  await proxy.refresh();
                }
              });
            },
          },
          {
            name: "del",
            show: ({ row }) => showBtn("tenant:tenant:delete", row),
            icon: "i-heroicons:trash",
            text: () => t("crud.delete"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              if (
                row?.deleted_at !== null &&
                showBtn("tenant:tenant:realDelete", row)
              ) {
                msg
                  .delConfirm(t("crud.realDeleteDataMessage"))
                  .then(async () => {
                    const response = await realDelete([row.id]);
                    if (response.code === ResultCode.SUCCESS) {
                      msg.success(t("crud.delSuccess"));
                      await proxy.refresh();
                    }
                  });
              } else {
                msg.delConfirm(t("crud.delDataMessage")).then(async () => {
                  const response = await deleteByIds([row.id]);
                  if (response.code === ResultCode.SUCCESS) {
                    msg.success(t("crud.delSuccess"));
                    await proxy.refresh();
                  }
                });
              }
            },
          },
        ],
      },
    },
  ];
}
