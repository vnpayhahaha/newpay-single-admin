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
import type { BankDisbursementBillAxisVo } from "~/transaction/api/BankDisbursementBillAxis.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/BankDisbursementBillAxis.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (
    auth: string | string[],
    row: BankDisbursementBillAxisVo
  ) => {
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
    {
      label: () => t("bank_disbursement_bill_axis.bill_id"),
      prop: "bill_id",
      hide: true,
    },
    {
      label: () => t("bank_disbursement_bill_axis.sr_no"),
      prop: "sr_no",
      width: 120,
    },
    {
      label: () => t("bank_disbursement_bill_axis.corporate_product"),
      width: 100,
      prop: "corporate_product",
    },
    {
      label: () => t("bank_disbursement_bill_axis.payment_method"),
      width: 100,
      prop: "payment_method",
    },
    {
      label: () => t("bank_disbursement_bill_axis.batch_no"),
      width: 100,
      prop: "batch_no",
    },
    {
      label: () => t("bank_disbursement_bill_axis.next_working_day_date"),
      width: 160,
      prop: "next_working_day_date",
    },
    {
      label: () => t("bank_disbursement_bill_axis.debit_account_no"),
      width: 120,
      prop: "debit_account_no",
    },
    {
      label: () =>
        t("bank_disbursement_bill_axis.corporate_account_description"),
      prop: "corporate_account_description",
    },
    {
      label: () => t("bank_disbursement_bill_axis.beneficiary_account_no"),
      prop: "beneficiary_account_no",
    },
    {
      label: () => t("bank_disbursement_bill_axis.beneficiary_code"),
      prop: "beneficiary_code",
    },
    {
      label: () => t("bank_disbursement_bill_axis.beneficiary_name"),
      prop: "beneficiary_name",
    },
    {
      label: () => t("bank_disbursement_bill_axis.payee_name"),
      prop: "payee_name",
    },
    {
      label: () => t("bank_disbursement_bill_axis.currency"),
      prop: "currency",
    },
    {
      label: () => t("bank_disbursement_bill_axis.amount_payable"),
      prop: "amount_payable",
    },
    {
      label: () => t("bank_disbursement_bill_axis.transaction_status"),
      prop: "transaction_status",
    },
    { label: () => t("bank_disbursement_bill_axis.crn_no"), prop: "crn_no" },
    {
      label: () => t("bank_disbursement_bill_axis.paid_date"),
      prop: "paid_date",
    },
    {
      label: () => t("bank_disbursement_bill_axis.utr_reference_no"),
      prop: "utr_reference_no",
    },
    {
      label: () => t("bank_disbursement_bill_axis.funding_date"),
      prop: "funding_date",
    },
    { label: () => t("bank_disbursement_bill_axis.reason"), prop: "reason" },
    { label: () => t("bank_disbursement_bill_axis.remarks"), prop: "remarks" },
    { label: () => t("bank_disbursement_bill_axis.stage"), prop: "stage" },
    {
      label: () => t("bank_disbursement_bill_axis.email_id"),
      prop: "email_id",
    },
    {
      label: () => t("bank_disbursement_bill_axis.clg_branch_name"),
      prop: "clg_branch_name",
    },
    {
      label: () => t("bank_disbursement_bill_axis.activation_date"),
      prop: "activation_date",
    },
    {
      label: () => t("bank_disbursement_bill_axis.payout_mode"),
      prop: "payout_mode",
    },
    {
      label: () => t("bank_disbursement_bill_axis.finacle_cheque_no"),
      prop: "finacle_cheque_no",
    },
    {
      label: () => t("bank_disbursement_bill_axis.ifsc_code"),
      prop: "ifsc_code",
    },
    {
      label: () => t("bank_disbursement_bill_axis.bank_reference_no"),
      prop: "bank_reference_no",
    },
    {
      label: () => t("bank_disbursement_bill_axis.account_number"),
      prop: "account_number",
    },
    {
      label: () => t("bank_disbursement_bill_axis.created_by"),
      prop: "created_by",
    },
    {
      label: () => t("bank_disbursement_bill_axis.order_no"),
      prop: "order_no",
    },
    {
      label: () => t("bank_disbursement_bill_axis.upload_id"),
      prop: "upload_id",
    },
    {
      label: () => t("bank_disbursement_bill_axis.file_hash"),
      prop: "file_hash",
    },
    {
      label: () => t("bank_disbursement_bill_axis.created_at"),
      prop: "created_at",
    },
    {
      label: () => t("bank_disbursement_bill_axis.updated_at"),
      prop: "updated_at",
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
              showBtn("transaction:bank_disbursement_bill_axis:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:bank_disbursement_bill_axis:delete", row),
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
