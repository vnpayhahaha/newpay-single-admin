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
      label: () => t("bank_disbursement_bill_axis.payment_method"),
      prop: "payment_method",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.payment_method"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.debit_account_no"),
      prop: "debit_account_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.debit_account_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.beneficiary_account_no"),
      prop: "beneficiary_account_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.beneficiary_account_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.beneficiary_name"),
      prop: "beneficiary_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.beneficiary_name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.payee_name"),
      prop: "payee_name",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.payee_name"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.transaction_status"),
      prop: "transaction_status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.transaction_status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.paid_date"),
      prop: "paid_date",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.paid_date"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.utr_reference_no"),
      prop: "utr_reference_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.utr_reference_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.reason"),
      prop: "reason",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.reason"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.remarks"),
      prop: "remarks",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.remarks"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.payout_mode"),
      prop: "payout_mode",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.payout_mode"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.ifsc_code"),
      prop: "ifsc_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.ifsc_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.account_number"),
      prop: "account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.account_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.created_by"),
      prop: "created_by",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.created_by"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.upload_id"),
      prop: "upload_id",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.upload_id"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.file_hash"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_axis.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_axis.created_at"),
        clearable: true,
      },
    },
  ];
}
