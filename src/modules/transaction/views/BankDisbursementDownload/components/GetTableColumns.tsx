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
import type { BankDisbursementDownloadVo } from "~/transaction/api/BankDisbursementDownload.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { downloadById } from "~/transaction/api/BankDisbursementDownload.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import tool from "@/utils/tool";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (
    auth: string | string[],
    row: BankDisbursementDownloadVo
  ) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    // 索引序号列
    { type: "index" },
    // 普通列
    {
      label: () => t("bank_disbursement_download.file_name"),
      minWidth: "300px",
      prop: "file_name",
    },
    {
      label: () => t("bank_disbursement_download.path"),
      minWidth: "300px",
      prop: "path",
    },
    {
      label: () => t("bank_disbursement_download.hash"),
      width: "300px",
      prop: "hash",
    },
    {
      label: () => t("bank_disbursement_download.file_size"),
      width: "100px",
      prop: "file_size",
    },
    {
      label: () => t("bank_disbursement_download.record_count"),
      width: "100px",
      prop: "record_count",
    },
    {
      label: () => t("bank_disbursement_download.created_by"),
      width: "120px",
      prop: "created_by",
    },
    {
      label: () => t("bank_disbursement_download.created_at"),
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
              showBtn("transaction:bank_disbursement_download:delete", row),
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
