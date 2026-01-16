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
      label: () => t("bank_disbursement_bill_icici_2.credit_account_number"),
      prop: "credit_account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.credit_account_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.debit_account_number"),
      prop: "debit_account_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.debit_account_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.ifsc_code"),
      prop: "ifsc_code",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.ifsc_code"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.host_reference_number"),
      prop: "host_reference_number",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.host_reference_number"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.transaction_status"),
      prop: "transaction_status",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.transaction_status"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.created_at"),
      prop: "created_at",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.created_at"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.order_no"),
      prop: "order_no",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.order_no"),
        clearable: true,
      },
    },
    {
      label: () => t("bank_disbursement_bill_icici_2.file_hash"),
      prop: "file_hash",
      render: () => <el-input />,
      renderProps: {
        placeholder: t("bank_disbursement_bill_icici_2.file_hash"),
        clearable: true,
      },
    },
  ];
}
