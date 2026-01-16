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

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t("bank_disbursement_bill_idfc.beneficiary_name"),
      prop: "beneficiary_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.beneficiary_name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.beneficiary_account_number"),
      prop: "beneficiary_account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t(
          "bank_disbursement_bill_idfc.beneficiary_account_number"
        ),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.ifsc"),
      prop: "ifsc",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.ifsc"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.transaction_type"),
      prop: "transaction_type",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.transaction_type"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.debit_account_no"),
      prop: "debit_account_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.debit_account_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.transaction_date"),
      prop: "transaction_date",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.transaction_date"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.beneficiary_email_id"),
      prop: "beneficiary_email_id",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.beneficiary_email_id"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.utr_number"),
      prop: "utr_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.utr_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.status"),
      prop: "status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.created_at"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_idfc.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_idfc.file_hash"),
        clearable: true,
      },
    },
  ];
}
