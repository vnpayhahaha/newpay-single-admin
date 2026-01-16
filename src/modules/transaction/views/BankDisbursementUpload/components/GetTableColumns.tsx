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
import type { BankDisbursementUploadVo } from "~/transaction/api/BankDisbursementUpload.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { downloadById } from "~/transaction/api/BankDisbursementUpload.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import tool from "@/utils/tool";
import { selectStatus } from "@/modules/Common";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: BankDisbursementUploadVo) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    // 索引序号列
    // { type: "index" },
    {
      label: () => t("bankAccount.channel_id"),
      prop: "channel_id",
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
    // 普通列
    {
      label: () => t("bank_disbursement_upload.upload_bill_template_id"),
      minWidth: "120px",
      prop: "upload_bill_template_id",
    },
    {
      label: () => t("bank_disbursement_upload.file_name"),
      minWidth: "330px",
      prop: "file_name",
    },
    {
      label: () => t("bank_disbursement_upload.parsing_status"),
      width: "100px",
      prop: "parsing_status",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(
                selectStatus("bank_disbursement_upload", "parsing_status_list")
              )
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              if (item.value === 1) {
                return {
                  label: `${item.label}`,
                  value: item.value,
                  color: "success",
                };
              }
              return {
                label: `${item.label}`,
                value: item.value,
                color: "info",
              };
            });
          },
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("bank_disbursement_upload.parsing_progress_message"),
      minWidth: "300px",
      type: "merge",
      prop: "parsing_status_message",
      cellRender: ({ row }) => {
        return (
          <ma-dual-progress
            success-value={row.success_count}
            failure-value={row.failure_count}
            total={row.record_count}
            success-color="#52c41a"
            failure-color="#ff4d4f"
          />
        );
      },
    },
    {
      label: () => t("bank_disbursement_upload.file_size"),
      width: "100px",
      prop: "file_size",
    },
    {
      label: () => t("bank_disbursement_upload.record_count"),
      width: "100px",
      prop: "record_count",
    },
    {
      label: () => t("bank_disbursement_upload.success_count"),
      width: "100px",
      prop: "success_count",
    },
    {
      label: () => t("bank_disbursement_upload.failure_count"),
      width: "100px",
      prop: "failure_count",
    },
    {
      label: () => t("bank_disbursement_upload.path"),
      minWidth: "300px",
      prop: "path",
    },
    {
      label: () => t("bank_disbursement_upload.hash"),
      width: "300px",
      prop: "hash",
    },
    {
      label: () => t("bank_disbursement_upload.created_by"),
      width: "120px",
      prop: "created_by",
    },
    {
      label: () => t("bank_disbursement_upload.created_at"),
      width: "180px",
      prop: "created_at",
    },

    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "160px",
      fixed: "left",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:bank_disbursement_upload:delete", row),
            icon: "i-heroicons:arrow-down-on-square-stack",
            text: () => t("crud.downlaod"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.exportConfirm(t("crud.downlaodMessage")).then(async () => {
                await downloadById(row.id)
                  .then((res) => {
                    tool.download(res);
                    msg.success(
                      t("disbursement_order.downloadBankBillSuccess")
                    );
                  })
                  .catch(() => {
                    msg.error(t("disbursement_order.downloadBankBillError"));
                  })
                  .finally(async () => {
                    await proxy.refresh();
                  });
              });
            },
          },
        ],
      },
    },
  ];
}
